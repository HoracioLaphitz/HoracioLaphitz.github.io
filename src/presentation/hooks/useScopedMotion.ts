import { animate as animateElements } from "animejs/animation";
import { createScope } from "animejs/scope";
import { useEffect, useRef, type RefObject } from "react";

type MotionTargets = HTMLElement[];
type MotionRunner = (targets: MotionTargets) => void | (() => void);

interface ScopedMotionOptions {
  root: HTMLElement;
  targetSelectors: readonly string[];
  observe?: boolean;
  animate?: MotionRunner;
}

interface ProjectMotionOptions {
  root: HTMLElement;
  animate?: MotionRunner;
}

interface UseProjectMotionOptions {
  root: RefObject<HTMLElement>;
  cardIds: readonly string[];
  animate?: MotionRunner;
}

interface UseScopedMotionOptions
  extends Omit<ScopedMotionOptions, "root"> {
  root: RefObject<HTMLElement>;
}

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";
const scopedDisposers = new WeakMap<HTMLElement, () => void>();

const resolveFinalState = (targets: MotionTargets) => {
  targets.forEach((target) => {
    target.style.removeProperty("opacity");
    target.style.removeProperty("transform");
  });
};

const applyInitialState = (targets: MotionTargets) => {
  targets.forEach((target) => {
    target.style.opacity = "0";
    target.style.transform = "translateY(16px)";
  });
};

const collectTargets = (
  root: HTMLElement,
  selectors: readonly string[],
): MotionTargets => {
  try {
    return selectors.flatMap((selector) => [
      ...(root.matches(selector) ? [root] : []),
      ...Array.from(root.querySelectorAll<HTMLElement>(selector)),
    ]).filter((target, index, targets) => targets.indexOf(target) === index);
  } catch {
    return [];
  }
};

const canUseMediaQuery = () =>
  typeof window !== "undefined" && typeof window.matchMedia === "function";

const createMotionScope = (root: HTMLElement) =>
  createScope({ root });

const runEntrance: MotionRunner = (targets) => {
  const sequence = animateElements(targets, {
    opacity: [0, 1],
    translateY: [16, 0],
    duration: 420,
    ease: "out(3)",
  });

  return () => sequence.revert();
};

export const setupScopedMotion = ({
  root,
  targetSelectors,
  observe = false,
  animate = runEntrance,
}: ScopedMotionOptions) => {
  scopedDisposers.get(root)?.();

  const targets = collectTargets(root, targetSelectors);
  if (targets.length === 0) return () => undefined;

  let scope: ReturnType<typeof createScope>;

  try {
    scope = createMotionScope(root);
  } catch {
    resolveFinalState(targets);
    return () => undefined;
  }

  const dispose = () => {
    if (scopedDisposers.get(root) === dispose) scopedDisposers.delete(root);
    mediaQuery?.removeEventListener("change", refreshForPreferenceChange);
    scope.revert();
    resolveFinalState(targets);
  };

  scopedDisposers.set(root, dispose);
  const mediaQuery = canUseMediaQuery()
    ? window.matchMedia(reducedMotionQuery)
    : undefined;
  const refreshForPreferenceChange = () => scope.refresh();

  try {
    scope.add(() => {
      if (mediaQuery?.matches) {
        resolveFinalState(targets);
        return;
      }

      let observer: IntersectionObserver | undefined;
      let cancel: (() => void) | void;
      let entranceStarted = false;

      const startEntrance = () => {
        if (entranceStarted) return;
        entranceStarted = true;

        try {
          cancel = animate(targets);
        } catch {
          observer?.disconnect();
          resolveFinalState(targets);
        }
      };

      try {
        applyInitialState(targets);

        if (observe && typeof IntersectionObserver !== "undefined") {
          observer = new IntersectionObserver((entries) => {
            if (!entries.some(({ isIntersecting }) => isIntersecting)) return;

            targets.forEach((target) => observer?.unobserve(target));
            observer?.disconnect();
            startEntrance();
          });
          targets.forEach((target) => observer?.observe(target));
        } else {
          startEntrance();
        }
      } catch {
        observer?.disconnect();
        resolveFinalState(targets);
        return;
      }

      return () => {
        observer?.disconnect();
        cancel?.();
        resolveFinalState(targets);
      };
    });
    mediaQuery?.addEventListener("change", refreshForPreferenceChange);
  } catch {
    dispose();
  }

  return dispose;
};

export const useScopedMotion = ({ root, ...options }: UseScopedMotionOptions) => {
  useEffect(() => {
    if (!root.current) return;
    return setupScopedMotion({ root: root.current, ...options });
  }, [options.animate, options.observe, options.targetSelectors, root]);
};

const projectCardIdentity = (card: HTMLElement) =>
  card.querySelector('a[href^="/proyectos/"]')?.getAttribute("href") ??
  card.textContent ??
  "";

const projectTargets = (root: HTMLElement) => {
  const heading = root.querySelector<HTMLElement>(
    '[data-motion="projects-heading"]',
  );
  const filters = root.querySelector<HTMLElement>(
    '[data-motion="projects-filters"]',
  );
  const cards = Array.from(
    root.querySelectorAll<HTMLElement>('[data-motion="project-card"]'),
  );

  return [
    ...(heading ? [heading] : []),
    ...(filters instanceof HTMLElement ? [filters] : []),
    ...cards,
  ];
};

export const setupProjectMotion = ({ root, animate }: ProjectMotionOptions) => {
  type MotionChannel = "mount" | "generation";
  type ActiveMotion = {
    scope: ReturnType<typeof createScope>;
    finish: () => void;
  };

  let mountMotion: ActiveMotion | undefined;
  let generationMotion: ActiveMotion | undefined;
  let previousCardIds = new Set<string>();
  const mediaQuery = canUseMediaQuery()
    ? window.matchMedia(reducedMotionQuery)
    : undefined;

  const stop = (channel: MotionChannel) => {
    const activeMotion = channel === "mount" ? mountMotion : generationMotion;
    activeMotion?.finish();
    activeMotion?.scope.revert();
    if (channel === "mount") mountMotion = undefined;
    else generationMotion = undefined;
  };

  const start = (targets: MotionTargets, channel: MotionChannel) => {
    stop(channel);

    if (targets.length === 0) return;

    try {
      const scope = createMotionScope(root);
      let cancel: (() => void) | void;
      let finished = false;
      const finish = () => {
        if (finished) return;
        finished = true;
        cancel?.();
        resolveFinalState(targets);
      };

      scope.add(() => {
        if (mediaQuery?.matches) {
          resolveFinalState(targets);
          return;
        }

        try {
          applyInitialState(targets);
          cancel = (animate ?? runEntrance)(targets);
          return finish;
        } catch {
          finish();
        }
      });

      const activeMotion = { scope, finish };
      if (channel === "mount") mountMotion = activeMotion;
      else generationMotion = activeMotion;
    } catch {
      resolveFinalState(targets);
    }
  };

  const resolveReducedMotion = (event: MediaQueryListEvent) => {
    if (!event.matches) return;
    stop("generation");
    stop("mount");
    resolveFinalState(projectTargets(root));
  };

  mediaQuery?.addEventListener("change", resolveReducedMotion);

  return {
    mount() {
      const cards = Array.from(
        root.querySelectorAll<HTMLElement>('[data-motion="project-card"]'),
      );
      start(projectTargets(root), "mount");
      previousCardIds = new Set(cards.map(projectCardIdentity));
    },
    update() {
      const cards = Array.from(
        root.querySelectorAll<HTMLElement>('[data-motion="project-card"]'),
      );
      const enteringCards = cards.filter(
        (card) => !previousCardIds.has(projectCardIdentity(card)),
      );

      start(enteringCards, "generation");
      previousCardIds = new Set(cards.map(projectCardIdentity));
    },
    dispose() {
      mediaQuery?.removeEventListener("change", resolveReducedMotion);
      stop("generation");
      stop("mount");
      resolveFinalState(projectTargets(root));
    },
  };
};

export const useProjectMotion = ({
  root,
  cardIds,
  animate,
}: UseProjectMotionOptions) => {
  const controllerRef = useRef<ReturnType<typeof setupProjectMotion>>();
  const cardGeneration = cardIds.join("\u0000");

  useEffect(() => {
    if (!root.current) return;

    const controller = setupProjectMotion({ root: root.current, animate });
    controllerRef.current = controller;
    controller.mount();

    return () => {
      controller.dispose();
      if (controllerRef.current === controller) controllerRef.current = undefined;
    };
  }, [animate, root]);

  useEffect(() => {
    controllerRef.current?.update();
  }, [cardGeneration]);
};
