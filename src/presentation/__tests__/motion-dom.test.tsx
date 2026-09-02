// @vitest-environment jsdom

import { flushSync } from "react-dom";
import { createRoot } from "react-dom/client";
import { renderToStaticMarkup } from "react-dom/server";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { extname, resolve } from "node:path";
import { describe, expect, it, vi } from "vitest";
import Footer from "@presentation/components/layout/Footer";
import Navigation from "@presentation/components/layout/Navigation";
import ProjectCategories, {
  type SerializedProject,
} from "@presentation/components/sections/ProjectCategories";
import Certifications from "@presentation/components/sections/Certifications";
import CertificateModal from "@presentation/components/sections/CertificateModal";
import Contact from "@presentation/components/sections/Contact";
import Experience from "@presentation/components/sections/Experience";
import Hero from "@presentation/components/sections/Hero";
import Skills from "@presentation/components/sections/Skills";

function MotionTestIsland() {
  return <p>Motion-ready island</p>;
}

describe("motion DOM environment", () => {
  it("renders and unmounts a React island", () => {
    const container = document.createElement("div");
    const root = createRoot(container);

    flushSync(() => root.render(<MotionTestIsland />));
    expect(container.textContent).toBe("Motion-ready island");

    root.unmount();
    expect(container.textContent).toBe("");
  });
});

describe("certificate modal focus management", () => {
  it("recaptures focus when iframe tabbing reaches content outside the dialog", () => {
    const trigger = document.createElement("button");
    trigger.textContent = "Abrir certificado";
    document.body.append(trigger);
    trigger.focus();

    const container = document.createElement("div");
    document.body.append(container);
    const outsideLink = document.createElement("a");
    outsideLink.href = "#contacto";
    outsideLink.textContent = "Contacto";
    document.body.append(outsideLink);
    const root = createRoot(container);

    flushSync(() =>
      root.render(
        <CertificateModal
          title="Certificado de prueba"
          url="/certificado.pdf"
          onClose={() => root.unmount()}
        />,
      ),
    );

    const closeButton = container.querySelector<HTMLButtonElement>(
      'button[aria-label="Cerrar"]',
    );
    const iframe = container.querySelector<HTMLIFrameElement>("iframe");
    const download = container.querySelector<HTMLAnchorElement>("a[download]");

    expect(document.activeElement).toBe(closeButton);
    iframe?.focus();
    outsideLink.focus();
    expect(document.activeElement).toBe(download);

    download?.dispatchEvent(
      new KeyboardEvent("keydown", { key: "Tab", shiftKey: true, bubbles: true }),
    );
    expect(document.activeElement).toBe(iframe);

    iframe?.dispatchEvent(
      new KeyboardEvent("keydown", { key: "Tab", bubbles: true }),
    );
    expect(document.activeElement).toBe(download);

    closeButton?.focus();
    closeButton?.dispatchEvent(
      new KeyboardEvent("keydown", { key: "Escape", bubbles: true }),
    );
    expect(document.activeElement).toBe(trigger);
    trigger.remove();
    outsideLink.remove();
    container.remove();
  });
});

const approvedMotionMarkers = [
  "hero-actions",
  "hero-eyebrow",
  "hero-heading",
  "hero-summary",
  "project-card",
  "projects-filters",
  "projects-heading",
];

const projects: SerializedProject[] = [
  {
    slug: "motion-contract",
    title: "Motion contract project",
    description: "A deterministic project fixture for motion target tests.",
    category: "Machine Learning",
    tags: ["React"],
    publishDate: "2026-08-22T00:00:00.000Z",
    author: "Horacio Laphitz",
    status: "published",
    featured: true,
  },
];

const projectMotionProjects: SerializedProject[] = [
  {
    ...projects[0],
    slug: "project-alpha",
    title: "Project alpha",
  },
  {
    ...projects[0],
    slug: "project-beta",
    title: "Project beta",
  },
  {
    ...projects[0],
    slug: "project-gamma",
    title: "Project gamma",
    category: "Data Visualization",
  },
];

interface ScopedMotionModule {
  setupScopedMotion(options: {
    root: HTMLElement;
    targetSelectors: readonly string[];
    observe?: boolean;
    animate?: (targets: HTMLElement[]) => void | (() => void);
  }): () => void;

  setupProjectMotion(options: {
    root: HTMLElement;
    animate: (targets: HTMLElement[]) => void | (() => void);
  }): {
    mount(): void;
    update(): void;
    dispose(): void;
  };
}

const scopedMotionModulePath = "../hooks/useScopedMotion";

const loadScopedMotion = async () =>
  (await import(/* @vite-ignore */ scopedMotionModulePath)) as ScopedMotionModule;

const readSourceFiles = (directory: string): string[] =>
  readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = resolve(directory, entry.name);

    if (entry.isDirectory()) return readSourceFiles(path);
    return [".astro", ".ts", ".tsx"].includes(extname(entry.name))
      ? [readFileSync(path, "utf8")]
      : [];
  });

const motionSource = () =>
  readSourceFiles(resolve(process.cwd(), "src")).join("\n");

const animationCsp =
  "default-src 'self'; script-src 'self' 'unsafe-inline' https://embedding.tableauusercontent.com https://fonts.googleapis.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://api.github.com https://raw.githubusercontent.com https://api.web3forms.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self' https://api.web3forms.com; upgrade-insecure-requests;";

describe("Anime.js delivery contracts", () => {
  it("pins animejs as an exact application dependency", () => {
    const packageManifest = JSON.parse(
      readFileSync(resolve(process.cwd(), "package.json"), "utf8"),
    ) as { dependencies?: Record<string, string> };

    expect(packageManifest.dependencies?.animejs).toBe("4.5.0");
  });

  it("resolves the exact Anime.js version in pnpm's lockfile", () => {
    const lockfile = readFileSync(
      resolve(process.cwd(), "pnpm-lock.yaml"),
      "utf8",
    );

    expect(lockfile).toMatch(
      /^ {6}animejs:\r?\n {8}specifier: 4\.5\.0\r?\n {8}version: 4\.5\.0(?:\r?$|\r?\n)/m,
    );
    expect(lockfile).toMatch(/^ {2}animejs@4\.5\.0:\r?$/m);
  });

  it("permits only the required granular ESM imports when motion source is added", () => {
    const animeImports = Array.from(
      motionSource().matchAll(
        /\b(?:from\s*|import\s*\(\s*)["'](animejs(?:\/[^"']+)?)['"]/g,
      ),
      ([, specifier]) => specifier,
    );

    expect(
      animeImports.filter(
        (specifier) =>
          !["animejs/animation", "animejs/scope"].includes(specifier),
      ),
    ).toEqual([]);
    expect(motionSource()).not.toMatch(/\brequire\(\s*["']animejs(?:\/|["'])/);
    expect(motionSource()).not.toMatch(/\b(?:window|globalThis)\.anime\b/);
  });

  it("keeps animation bundled without a remote script origin or CSP and analytics changes", () => {
    const source = motionSource();
    const vercelConfig = JSON.parse(
      readFileSync(resolve(process.cwd(), "vercel.json"), "utf8"),
    ) as { headers: Array<{ headers: Array<{ key: string; value: string }> }> };
    const deploymentCsp = vercelConfig.headers
      .flatMap(({ headers }) => headers)
      .find(({ key }) => key === "Content-Security-Policy")?.value;
    const staticHeaders = readFileSync(
      resolve(process.cwd(), "public/_headers"),
      "utf8",
    );
    const layout = readFileSync(
      resolve(process.cwd(), "src/presentation/layouts/Layout.astro"),
      "utf8",
    );

    expect(source).not.toMatch(
      /(?:https?:)?\/\/[^\s"']*(?:animejs|cdnjs|unpkg|jsdelivr|skypack)[^\s"']*/i,
    );
    expect(deploymentCsp).toBe(animationCsp);
    expect(staticHeaders).toContain(`Content-Security-Policy: ${animationCsp}`);
    expect(layout).toMatch(
      /import Analytics from "@vercel\/analytics\/astro";/,
    );
    expect(layout).toContain("<Analytics />");
    expect(layout).not.toMatch(/umami/i);
  });
});

const parseMarkup = (markup: string) => {
  const root = document.createElement("main");
  root.innerHTML = markup;
  return root;
};

const renderPortfolioMarkup = () =>
  parseMarkup(
    renderToStaticMarkup(
      <>
        <Navigation />
        <Hero />
        <ProjectCategories posts={projects} />
        <Skills />
        <Experience />
        <Certifications />
        <Contact />
        <Footer />
      </>,
    ),
  );

const expectFinalVisibleState = (target: HTMLElement) => {
  expect(target.className).not.toMatch(/(?:^|\s)opacity-0(?:\s|$)/);
  expect(target.className).not.toMatch(/(?:^|\s)translate-y-[24](?:\s|$)/);
  expect(target.style.opacity).not.toBe("0");
  expect(target.style.transform).not.toMatch(/translate/);
};

class MotionObserver {
  static instances: MotionObserver[] = [];

  disconnected = false;
  observed = new Set<Element>();
  unobserved = new Set<Element>();

  constructor(private readonly callback: IntersectionObserverCallback) {
    MotionObserver.instances.push(this);
  }

  observe = (target: Element) => {
    this.observed.add(target);
  };

  unobserve = (target: Element) => {
    this.observed.delete(target);
    this.unobserved.add(target);
  };

  disconnect = () => {
    this.disconnected = true;
  };

  complete(target: Element) {
    this.callback(
      [{ isIntersecting: true, target } as IntersectionObserverEntry],
      this as unknown as IntersectionObserver,
    );
  }
}

class MotionMediaQuery {
  matches = false;
  listeners = new Set<(event: MediaQueryListEvent) => void>();

  addEventListener = (
    type: "change",
    listener: (event: MediaQueryListEvent) => void,
  ) => {
    if (type === "change") this.listeners.add(listener);
  };

  removeEventListener = (
    type: "change",
    listener: (event: MediaQueryListEvent) => void,
  ) => {
    if (type === "change") this.listeners.delete(listener);
  };

  emit(matches: boolean) {
    this.matches = matches;
    const event = { matches } as MediaQueryListEvent;
    this.listeners.forEach((listener) => listener(event));
  }
}

const installMotionPlatform = () => {
  const mediaQuery = new MotionMediaQuery();
  MotionObserver.instances = [];
  Object.defineProperty(window, "matchMedia", {
    configurable: true,
    value: () => mediaQuery,
  });
  Object.defineProperty(window, "IntersectionObserver", {
    configurable: true,
    value: MotionObserver,
  });
  return mediaQuery;
};

const renderProjectMotionFixture = () => {
  const container = document.createElement("div");
  const root = createRoot(container);

  flushSync(() => root.render(<ProjectCategories posts={projectMotionProjects} />));

  const selectCategory = (category: string) => {
    const button = Array.from(container.querySelectorAll("button")).find(
      ({ textContent }) => textContent === category,
    ) as HTMLButtonElement;

    expect(button).toBeDefined();
    flushSync(() => button.click());
  };

  const cards = () => Array.from(container.querySelectorAll<HTMLElement>("article"));

  return { cards, container, root, selectCategory };
};

const renderProjectMotionIsland = async () => {
  const useProjectMotion = vi.fn();
  vi.resetModules();
  vi.doMock("@presentation/hooks/useScopedMotion", () => ({
    useProjectMotion,
  }));

  const { default: ProjectMotionIsland } = await import(
    "@presentation/components/sections/ProjectCategories"
  );
  const container = document.createElement("div");
  const root = createRoot(container);

  flushSync(() => root.render(<ProjectMotionIsland posts={projectMotionProjects} />));

  return { container, root, useProjectMotion };
};

const renderSkillsMotionIsland = async () => {
  const useScopedMotion = vi.fn();
  vi.resetModules();
  vi.doMock("@presentation/hooks/useScopedMotion", () => ({
    useScopedMotion,
  }));

  const { default: SkillsMotionIsland } = await import(
    "@presentation/components/sections/Skills"
  );
  const container = document.createElement("div");
  const root = createRoot(container);

  flushSync(() => root.render(<SkillsMotionIsland />));

  return { container, root, useScopedMotion };
};

const renderExperienceMotionIsland = async () => {
  const useScopedMotion = vi.fn();
  vi.resetModules();
  vi.doMock("@presentation/hooks/useScopedMotion", () => ({
    useScopedMotion,
  }));

  const { default: ExperienceMotionIsland } = await import(
    "@presentation/components/sections/Experience"
  );
  const container = document.createElement("div");
  const root = createRoot(container);

  flushSync(() => root.render(<ExperienceMotionIsland />));

  return { container, root, useScopedMotion };
};

const renderCertificationsMotionIsland = async () => {
  const useScopedMotion = vi.fn();
  vi.resetModules();
  vi.doMock("@presentation/hooks/useScopedMotion", () => ({
    useScopedMotion,
  }));

  const { default: CertificationsMotionIsland } = await import(
    "@presentation/components/sections/Certifications"
  );
  const container = document.createElement("div");
  const root = createRoot(container);

  flushSync(() => root.render(<CertificationsMotionIsland />));

  return { container, root, useScopedMotion };
};

const renderContactMotionIsland = async () => {
  const useScopedMotion = vi.fn();
  vi.resetModules();
  vi.doMock("@presentation/hooks/useScopedMotion", () => ({
    useScopedMotion,
  }));

  const { default: ContactMotionIsland } = await import(
    "@presentation/components/sections/Contact"
  );
  const container = document.createElement("div");
  const root = createRoot(container);

  flushSync(() => root.render(<ContactMotionIsland />));

  return { container, root, useScopedMotion };
};

describe("motion orchestration contracts", () => {
  it("keeps the approved Hero and project content visible and usable in SSR markup", () => {
    const hero = parseMarkup(renderToStaticMarkup(<Hero />));
    const projectsMarkup = parseMarkup(
      renderToStaticMarkup(<ProjectCategories posts={projects} />),
    );

    expect(hero.querySelectorAll("a")).toHaveLength(3);
    expect(projectsMarkup.querySelectorAll("button")).not.toHaveLength(0);
    expectFinalVisibleState(hero.firstElementChild as HTMLElement);
    expectFinalVisibleState(projectsMarkup.querySelector("header") as HTMLElement);
  });

  it("resolves motion targets to the final visible state when scoped setup or observation fails", async () => {
    const root = parseMarkup('<section data-motion="hero-heading"></section>');
    const { setupScopedMotion } = await loadScopedMotion();

    expect(() =>
      setupScopedMotion({
        root,
        targetSelectors: ["["],
        observe: true,
      }),
    ).not.toThrow();

    Object.defineProperty(window, "IntersectionObserver", {
      configurable: true,
      value: class {
        constructor() {
          throw new Error("observation unavailable");
        }
      },
    });
    expect(() =>
      setupScopedMotion({
        root,
        targetSelectors: ['[data-motion="hero-heading"]'],
        observe: true,
      }),
    ).not.toThrow();

    installMotionPlatform();
    const animationFailure = vi.fn(() => {
      throw new Error("animation unavailable");
    });
    expect(() =>
      setupScopedMotion({
        root,
        targetSelectors: ['[data-motion="hero-heading"]'],
        animate: animationFailure,
      }),
    ).not.toThrow();
    expect(animationFailure).toHaveBeenCalledTimes(1);
    expectFinalVisibleState(
      root.querySelector('[data-motion="hero-heading"]') as HTMLElement,
    );
  });

  it("resolves targets when scope creation throws during setup", async () => {
    const root = parseMarkup('<section data-motion="hero-heading"></section>');
    const target = root.querySelector('[data-motion="hero-heading"]') as HTMLElement;

    target.style.opacity = "0";
    target.style.transform = "translateY(16px)";
    vi.resetModules();
    vi.doMock("animejs/scope", () => ({
      createScope: () => {
        throw new Error("scope unavailable");
      },
    }));

    try {
      const { setupScopedMotion } = await loadScopedMotion();

      expect(() =>
        setupScopedMotion({
          root,
          targetSelectors: ['[data-motion="hero-heading"]'],
        }),
      ).not.toThrow();
      expectFinalVisibleState(target);
    } finally {
      vi.doUnmock("animejs/scope");
      vi.resetModules();
    }
  });

  it("skips entrance transforms and staggers when reduced motion matches at mount", async () => {
    const mediaQuery = installMotionPlatform();
    mediaQuery.matches = true;
    const root = parseMarkup('<section data-motion="skills-group"></section>');
    const { setupScopedMotion } = await loadScopedMotion();
    const animate = vi.fn();

    const dispose = setupScopedMotion({
      root,
      targetSelectors: ['[data-motion="skills-group"]'],
      observe: true,
      animate,
    });

    expect(MotionObserver.instances).toHaveLength(0);
    expect(animate).not.toHaveBeenCalled();
    expectFinalVisibleState(
      root.querySelector('[data-motion="skills-group"]') as HTMLElement,
    );
    dispose();
  });

  it("cancels active scoped motion immediately when reduced motion changes live", async () => {
    const mediaQuery = installMotionPlatform();
    const root = parseMarkup('<section data-motion="experience-group"></section>');
    const { setupScopedMotion } = await loadScopedMotion();
    const cancel = vi.fn();
    const animate = vi.fn(() => cancel);

    const dispose = setupScopedMotion({
      root,
      targetSelectors: ['[data-motion="experience-group"]'],
      observe: true,
      animate,
    });
    const target = root.querySelector(
      '[data-motion="experience-group"]',
    ) as HTMLElement;

    MotionObserver.instances[0]?.complete(target);
    mediaQuery.emit(true);

    expect(animate).toHaveBeenCalledTimes(1);
    expect(cancel).toHaveBeenCalledTimes(1);
    expectFinalVisibleState(target);
    expect(mediaQuery.listeners.size).toBe(1);
    dispose();
  });

  it("releases observer and preference ownership across repeated setup, unmount, and remount", async () => {
    const mediaQuery = installMotionPlatform();
    const root = parseMarkup('<section data-motion="contact-group"></section>');
    const { setupScopedMotion } = await loadScopedMotion();
    const cancelFirst = vi.fn();
    const animate = vi
      .fn<() => () => void>()
      .mockReturnValueOnce(cancelFirst)
      .mockReturnValue(() => undefined);

    const disposeFirst = setupScopedMotion({
      root,
      targetSelectors: ['[data-motion="contact-group"]'],
      observe: true,
      animate,
    });
    MotionObserver.instances[0]?.complete(
      root.querySelector('[data-motion="contact-group"]') as HTMLElement,
    );
    const disposeSecond = setupScopedMotion({
      root,
      targetSelectors: ['[data-motion="contact-group"]'],
      observe: true,
      animate,
    });

    expect(MotionObserver.instances.filter(({ disconnected }) => !disconnected)).toHaveLength(1);
    expect(mediaQuery.listeners.size).toBe(1);
    expect(cancelFirst).toHaveBeenCalledTimes(1);

    disposeFirst();
    disposeSecond();
    expect(MotionObserver.instances.every(({ disconnected }) => disconnected)).toBe(true);
    expect(mediaQuery.listeners.size).toBe(0);
    expectFinalVisibleState(
      root.querySelector('[data-motion="contact-group"]') as HTMLElement,
    );

    const disposeRemount = setupScopedMotion({
      root,
      targetSelectors: ['[data-motion="contact-group"]'],
      observe: true,
    });
    expect(MotionObserver.instances.filter(({ disconnected }) => !disconnected)).toHaveLength(1);
    disposeRemount();
  });

  it("starts an observed reveal once and unobserves its completed target", async () => {
    installMotionPlatform();
    const root = parseMarkup('<section data-motion="skills-group"></section>');
    const target = root.querySelector('[data-motion="skills-group"]') as HTMLElement;
    const { setupScopedMotion } = await loadScopedMotion();
    const animate = vi.fn();

    const dispose = setupScopedMotion({
      root,
      targetSelectors: ['[data-motion="skills-group"]'],
      observe: true,
      animate,
    });
    const observer = MotionObserver.instances[0] as MotionObserver;

    expect(animate).not.toHaveBeenCalled();
    observer.complete(target);
    observer.complete(target);

    expect(animate).toHaveBeenCalledTimes(1);
    expect(observer.unobserved).toEqual(new Set([target]));
    expect(observer.disconnected).toBe(true);
    dispose();
    expectFinalVisibleState(target);
  });

  it("limits the default entrance sequence to opacity and transform without loops", () => {
    const helperSource = readFileSync(
      resolve(process.cwd(), "src/presentation/hooks/useScopedMotion.ts"),
      "utf8",
    );

    expect(helperSource).toMatch(/opacity:\s*\[0,\s*1\]/);
    expect(helperSource).toMatch(/translateY:\s*\[16,\s*0\]/);
    expect(helperSource).not.toMatch(/\bloop\s*:/);
    expect(helperSource).not.toMatch(
      /\b(?:width|height|top|right|bottom|left|margin|padding)\s*:/,
    );
  });

  it("permits exactly the approved existing data-motion markers and none on excluded surfaces", () => {
    const markup = renderPortfolioMarkup();
    const markers = Array.from(markup.querySelectorAll<HTMLElement>("[data-motion]"))
      .map((element) => element.dataset.motion)
      .sort();

    expect(markers).toEqual(approvedMotionMarkers);
    expect(markup.querySelectorAll("nav [data-motion], footer [data-motion]")).toHaveLength(0);
    expect(Array.from(markup.querySelectorAll<HTMLElement>("article[data-motion]")).map(
      (element) => element.dataset.motion,
    )).toEqual(["project-card"]);
  });

  it("keeps Hero headings, copy, and CTA destinations on the existing marked nodes", () => {
    const hero = parseMarkup(renderToStaticMarkup(<Hero />));
    const eyebrow = hero.querySelector('[data-motion="hero-eyebrow"]') as HTMLElement;
    const heading = hero.querySelector("h1") as HTMLElement;
    const summary = hero.querySelector('[data-motion="hero-summary"]') as HTMLElement;
    const actions = hero.querySelector('[data-motion="hero-actions"]') as HTMLElement;

    expect(eyebrow.tagName).toBe("P");
    expect(eyebrow.textContent).toBe(
      "Analista de datos · Automatización de procesos",
    );
    expect(heading.tagName).toBe("H1");
    expect(heading.textContent).toBe("Horacio Laphitz");
    expect(summary.tagName).toBe("P");
    expect(summary.textContent).toContain(
      "Integro fuentes de datos, automatizo validaciones",
    );
    expect(actions.tagName).toBe("DIV");
    expect(Array.from(actions.querySelectorAll(":scope > a")).map((link) => link.getAttribute("href"))).toEqual([
      "#featured-projects",
      "mailto:horaciolaphitz99@gmail.com",
      "/CV_HoracioLaphitz.pdf",
    ]);
    expect(Array.from(actions.querySelectorAll(":scope > a")).map(({ textContent }) => textContent)).toEqual([
      "Ver evidencia",
      "Contacto",
      "Descargar CV",
    ]);
    expect(eyebrow.dataset.motion).toBe("hero-eyebrow");
    expect(heading.dataset.motion).toBe("hero-heading");
    expect(summary.dataset.motion).toBe("hero-summary");
    expect(actions.dataset.motion).toBe("hero-actions");
  });

  it("delegates Hero entrance state to the motion helper without changing CTA interactions", () => {
    const heroSource = readFileSync(
      resolve(
        process.cwd(),
        "src/presentation/components/sections/Hero.tsx",
      ),
      "utf8",
    );
    const hero = parseMarkup(renderToStaticMarkup(<Hero />));
    const content = hero.querySelector("section > div") as HTMLElement;
    const actions = hero.querySelector('[data-motion="hero-actions"]') as HTMLElement;

    expect(heroSource).not.toMatch(/\b(?:mounted|setMounted)\b/);
    expect(heroSource).not.toMatch(/\buseEffect\b/);
    expect(content.className).toContain("max-w-content");
    expect(content.className).toContain("px-4");
    expect(actions.querySelector('a[href="#featured-projects"]')?.className).toContain(
      "focus-ring",
    );
    expect(actions.querySelector('a[href="#featured-projects"]')?.className).toContain(
      "hover:bg-brand-hover",
    );
    expect(actions.querySelector('a[href^="mailto:"]')?.className).toContain(
      "focus-ring",
    );
    expect(actions.querySelector('a[download]')?.className).toContain("focus-ring");
  });

  it("keeps project controls and article semantics on the existing marked nodes", () => {
    const projectsMarkup = parseMarkup(
      renderToStaticMarkup(<ProjectCategories posts={projects} />),
    );
    const heading = projectsMarkup.querySelector("header") as HTMLElement;
    const filters = heading.nextElementSibling as HTMLElement;
    const card = projectsMarkup.querySelector("article") as HTMLElement;

    expect(heading.tagName).toBe("HEADER");
    expect(heading.querySelector("h2")?.textContent).toBe("Proyectos");
    expect(filters.tagName).toBe("DIV");
    expect(Array.from(filters.querySelectorAll("button")).map(({ textContent }) => textContent)).toEqual([
      "Mostrar todo",
      "Machine Learning",
    ]);
    expect(card.tagName).toBe("ARTICLE");
    expect(projectsMarkup.querySelectorAll("article")).toHaveLength(1);
    expect(card.querySelector("h3")?.textContent).toBe("Motion contract project");
    expect(card.querySelector("p")?.textContent).toBe(
      "A deterministic project fixture for motion target tests.",
    );
    expect(card.querySelector('a[href="/proyectos/motion-contract"]')?.textContent).toContain(
      "Ver más",
    );
    expect(heading.dataset.motion).toBe("projects-heading");
    expect(filters.dataset.motion).toBe("projects-filters");
    expect(card.dataset.motion).toBe("project-card");
  });

  it("delegates project entrance state to the motion helper without changing filters or card interactions", () => {
    const projectCategoriesSource = readFileSync(
      resolve(
        process.cwd(),
        "src/presentation/components/sections/ProjectCategories.tsx",
      ),
      "utf8",
    );
    const fixture = renderProjectMotionFixture();
    const heading = fixture.container.querySelector("header") as HTMLElement;
    const filters = heading.nextElementSibling as HTMLElement;
    const firstCard = fixture.cards()[0];

    expect(projectCategoriesSource).not.toMatch(/\[mounted,\s*setMounted\]/);
    expect(projectCategoriesSource).not.toMatch(/getAnimationClass/);
    expect(heading.className).toBe("mb-10 lg:mb-12");
    expect(filters.className).toBe("");
    expect(firstCard.className).toContain("transition-colors duration-200");
    expect(firstCard.className).not.toContain("hover:-translate-y");

    fixture.selectCategory("Data Visualization");
    expect(fixture.cards()).toHaveLength(1);
    fixture.selectCategory("Mostrar todo");
    expect(fixture.cards()).toHaveLength(3);

    fixture.root.unmount();
  });

  it("keeps deferred section content groups, article counts, and contact form surface unchanged", () => {
    const skills = parseMarkup(renderToStaticMarkup(<Skills />));
    const experience = parseMarkup(renderToStaticMarkup(<Experience />));
    const certifications = parseMarkup(renderToStaticMarkup(<Certifications />));
    const contact = parseMarkup(renderToStaticMarkup(<Contact />));

    const skillsGroup = skills.querySelector("section > div") as HTMLElement;
    const experienceGroup = experience.querySelector("section > div") as HTMLElement;
    const certificationsGroup = certifications.querySelector("section > div") as HTMLElement;
    const contactGroup = contact.querySelector("section > div") as HTMLElement;

    expect(skillsGroup.textContent).toContain("Stack");
    expect(experienceGroup.textContent).toContain("Experiencia");
    expect(experience.querySelectorAll("article")).toHaveLength(6);
    expect(certificationsGroup.textContent).toContain("Certificaciones");
    expect(contactGroup.textContent).toContain("Trabajemos juntos");
    expect(contact.querySelectorAll("form, input, select, textarea")).toHaveLength(0);
    expect(Array.from(contact.querySelectorAll("a")).map((link) => link.getAttribute("href"))).toEqual([
      "mailto:horaciolaphitz99@gmail.com",
      "https://www.linkedin.com/in/horacio-laphitz/",
      "https://github.com/horaciolaphitz",
    ]);
    expect(skillsGroup.dataset.motion).toBeUndefined();
    expect(experienceGroup.dataset.motion).toBeUndefined();
    expect(certificationsGroup.dataset.motion).toBeUndefined();
    expect(contactGroup.dataset.motion).toBeUndefined();
  });

  it("adopts a scoped observed reveal for the existing Skills content group", async () => {
    const serverSkills = parseMarkup(renderToStaticMarkup(<Skills />));
    const serverSkillsGroup = serverSkills.querySelector("section > div") as HTMLElement;
    const { container, root, useScopedMotion } = await renderSkillsMotionIsland();
    const skillsGroup = container.querySelector("section > div") as HTMLElement;

    expectFinalVisibleState(serverSkillsGroup);
    Array.from(serverSkillsGroup.querySelectorAll<HTMLElement>(":scope > .grid > div")).forEach(
      expectFinalVisibleState,
    );
    expect(skillsGroup.dataset.motion).toBeUndefined();
    expectFinalVisibleState(skillsGroup);
    expect(skillsGroup.textContent).toContain("Stack");
    expect(useScopedMotion).not.toHaveBeenCalled();

    root.unmount();
    vi.doUnmock("@presentation/hooks/useScopedMotion");
    vi.resetModules();
  });

  it("adopts a scoped observed reveal for the existing Experience content group", async () => {
    const serverExperience = parseMarkup(renderToStaticMarkup(<Experience />));
    const serverExperienceGroup = serverExperience.querySelector("section > div") as HTMLElement;
    const { container, root, useScopedMotion } = await renderExperienceMotionIsland();
    const experienceGroup = container.querySelector("section > div") as HTMLElement;

    expectFinalVisibleState(serverExperienceGroup);
    expect(experienceGroup.dataset.motion).toBeUndefined();
    expectFinalVisibleState(experienceGroup);
    expect(experienceGroup.textContent).toContain("Experiencia");
    expect(container.querySelectorAll("article")).toHaveLength(6);
    expect(useScopedMotion).not.toHaveBeenCalled();

    root.unmount();
    vi.doUnmock("@presentation/hooks/useScopedMotion");
    vi.resetModules();
  });

  it("adopts a scoped observed reveal for the existing Certifications content group", async () => {
    const serverCertifications = parseMarkup(renderToStaticMarkup(<Certifications />));
    const serverCertificationsGroup = serverCertifications.querySelector("section > div") as HTMLElement;
    const { container, root, useScopedMotion } = await renderCertificationsMotionIsland();
    const certificationsGroup = container.querySelector("section > div") as HTMLElement;

    expectFinalVisibleState(serverCertificationsGroup);
    expect(certificationsGroup.dataset.motion).toBeUndefined();
    expectFinalVisibleState(certificationsGroup);
    expect(certificationsGroup.textContent).toContain("Certificaciones");
    expect(useScopedMotion).not.toHaveBeenCalled();

    root.unmount();
    vi.doUnmock("@presentation/hooks/useScopedMotion");
    vi.resetModules();
  });

  it("adopts a scoped observed reveal for the existing Contact content group", async () => {
    const serverContact = parseMarkup(renderToStaticMarkup(<Contact />));
    const serverContactGroup = serverContact.querySelector("section > div") as HTMLElement;
    const { container, root, useScopedMotion } = await renderContactMotionIsland();
    const contactGroup = container.querySelector("section > div") as HTMLElement;

    expectFinalVisibleState(serverContactGroup);
    expect(contactGroup.dataset.motion).toBeUndefined();
    expectFinalVisibleState(contactGroup);
    expect(contactGroup.textContent).toContain("Trabajemos juntos");
    expect(Array.from(contactGroup.querySelectorAll("a")).map((link) => link.getAttribute("href"))).toEqual([
      "mailto:horaciolaphitz99@gmail.com",
      "https://www.linkedin.com/in/horacio-laphitz/",
      "https://github.com/horaciolaphitz",
    ]);
    expect(useScopedMotion).not.toHaveBeenCalled();

    root.unmount();
    vi.doUnmock("@presentation/hooks/useScopedMotion");
    vi.resetModules();
  });

  it("keeps deferred sections static so Hero owns the authored entrance moment", () => {
    const deferredSections = [
      ["Skills.tsx", "skills-group"],
      ["Experience.tsx", "experience-group"],
      ["Certifications.tsx", "certifications-group"],
      ["Contact.tsx", "contact-group"],
    ] as const;

    expect(
      existsSync(
        resolve(process.cwd(), "src/presentation/hooks/useScrollAnimation.ts"),
      ),
    ).toBe(false);

    deferredSections.forEach(([fileName, marker]) => {
      const sectionSource = readFileSync(
        resolve(process.cwd(), "src/presentation/components/sections", fileName),
        "utf8",
      );

      expect(sectionSource).not.toMatch(/\buseScopedMotion\b/);
      expect(sectionSource).not.toContain(`data-motion="${marker}"`);
      expect(sectionSource).not.toMatch(/\buseScrollAnimation\b/);
      expect(sectionSource).not.toMatch(/\b(?:isVisible|elementRef)\b/);
      expect(sectionSource).not.toMatch(/\bopacity-0\b|\btranslate-y-[24]\b/);
    });
  });

  it("preserves the home-island hydration directives and uses the featured-project helper", () => {
    const homePage = readFileSync(
      resolve(process.cwd(), "src/pages/index.astro"),
      "utf8",
    );

    expect(homePage.match(/client:load/g)).toHaveLength(1);
    expect(homePage.match(/client:visible/g)).toHaveLength(3);
    expect(homePage).toMatch(/import FeaturedProjects from "@presentation\/components\/sections\/FeaturedProjects\.astro";/);
    expect(homePage).toMatch(/<FeaturedProjects\s*\/>/);
    expect(homePage).toMatch(/<Hero client:load\s*\/>/);
    expect(homePage).toMatch(/<About\s*\/>/);
    expect(homePage).toMatch(/<Skills client:visible\s*\/>/);
    expect(homePage).toMatch(/<Experience client:visible\s*\/>/);
    expect(homePage).toMatch(/<Contact client:visible\s*\/>/);
  });
});

describe("project motion generation contracts", () => {
  it("adopts the project helper in the existing island for initial and replaced card generations", async () => {
    const { container, root, useProjectMotion } = await renderProjectMotionIsland();

    expect(useProjectMotion).toHaveBeenLastCalledWith({
      root: expect.objectContaining({
        current: container.querySelector("#proyectos"),
      }),
      cardIds: ["project-alpha", "project-beta", "project-gamma"],
    });

    const filter = Array.from(container.querySelectorAll("button")).find(
      ({ textContent }) => textContent === "Data Visualization",
    ) as HTMLButtonElement;
    flushSync(() => filter.click());

    expect(useProjectMotion).toHaveBeenLastCalledWith({
      root: expect.objectContaining({
        current: container.querySelector("#proyectos"),
      }),
      cardIds: ["project-gamma"],
    });

    root.unmount();
    vi.doUnmock("@presentation/hooks/useScopedMotion");
    vi.resetModules();
  });

  it("animates the existing heading, filters, and initial ProjectCard articles once on mount", async () => {
    const { setupProjectMotion } = await loadScopedMotion();
    const fixture = renderProjectMotionFixture();
    const animate = vi.fn();
    const controller = setupProjectMotion({ root: fixture.container, animate });

    controller.mount();

    expect(animate).toHaveBeenCalledTimes(1);
    expect(animate).toHaveBeenLastCalledWith([
      fixture.container.querySelector("header"),
      fixture.container.querySelector("header")?.nextElementSibling,
      ...fixture.cards(),
    ]);

    controller.dispose();
    fixture.root.unmount();
  });

  it("cancels a project mount sequence before a fresh controller remounts", async () => {
    const { setupProjectMotion } = await loadScopedMotion();
    const fixture = renderProjectMotionFixture();
    const cancelMount = vi.fn();
    const animate = vi
      .fn<(_: HTMLElement[]) => void | (() => void)>()
      .mockReturnValue(cancelMount);
    const firstController = setupProjectMotion({
      root: fixture.container,
      animate,
    });

    firstController.mount();
    firstController.dispose();

    const remountedController = setupProjectMotion({
      root: fixture.container,
      animate,
    });
    remountedController.mount();

    expect(cancelMount).toHaveBeenCalledTimes(1);
    expect(cancelMount.mock.invocationCallOrder[0]).toBeLessThan(
      animate.mock.invocationCallOrder[1],
    );
    expect(animate).toHaveBeenCalledTimes(2);

    remountedController.dispose();
    fixture.root.unmount();
  });

  it("animates only cards absent from the immediately preceding filter result", async () => {
    const { setupProjectMotion } = await loadScopedMotion();
    const fixture = renderProjectMotionFixture();
    const animate = vi.fn();
    const controller = setupProjectMotion({ root: fixture.container, animate });

    controller.mount();
    fixture.selectCategory("Machine Learning");
    const persistingCards = fixture.cards();
    controller.update();
    fixture.selectCategory("Data Visualization");
    const enteringDataCards = fixture.cards();
    controller.update();
    fixture.selectCategory("Mostrar todo");
    const reenteringCards = fixture.cards().filter((card) =>
      ["/proyectos/project-alpha", "/proyectos/project-beta"].includes(
        card.querySelector("a:last-child")?.getAttribute("href") ?? "",
      ),
    );
    controller.update();

    expect(animate).toHaveBeenNthCalledWith(2, enteringDataCards);
    expect(animate).toHaveBeenNthCalledWith(3, reenteringCards);
    expect(animate.mock.calls.slice(1).flat()).not.toContain(persistingCards[0]);
    expect(animate.mock.calls.slice(1).flat()).not.toContain(
      fixture.container.querySelector("header"),
    );
    expect(animate.mock.calls.slice(1).flat()).not.toContain(
      fixture.container.querySelector("header")?.nextElementSibling,
    );

    controller.dispose();
    fixture.root.unmount();
  });

  it("reverts stale card-generation work before starting the next filter generation", async () => {
    const { setupProjectMotion } = await loadScopedMotion();
    const fixture = renderProjectMotionFixture();
    const cancelStaleGeneration = vi.fn();
    const animate = vi
      .fn<(_: HTMLElement[]) => void | (() => void)>()
      .mockReturnValueOnce(undefined)
      .mockReturnValueOnce(cancelStaleGeneration);
    const controller = setupProjectMotion({ root: fixture.container, animate });

    controller.mount();
    fixture.selectCategory("Machine Learning");
    controller.update();
    fixture.selectCategory("Data Visualization");
    controller.update();
    fixture.selectCategory("Mostrar todo");
    controller.update();

    expect(cancelStaleGeneration).toHaveBeenCalledTimes(1);
    expect(cancelStaleGeneration.mock.invocationCallOrder[0]).toBeLessThan(
      animate.mock.invocationCallOrder[2],
    );
    expect(animate).toHaveBeenNthCalledWith(3, [fixture.cards()[0], fixture.cards()[1]]);

    controller.dispose();
    fixture.root.unmount();
  });

  it("resolves current cards immediately without generation animation under reduced motion", async () => {
    const mediaQuery = installMotionPlatform();
    mediaQuery.matches = true;
    const { setupProjectMotion } = await loadScopedMotion();
    const fixture = renderProjectMotionFixture();
    const animate = vi.fn();
    const controller = setupProjectMotion({ root: fixture.container, animate });

    controller.mount();
    fixture.selectCategory("Data Visualization");
    controller.update();

    expect(animate).not.toHaveBeenCalled();
    fixture.cards().forEach(expectFinalVisibleState);

    controller.dispose();
    fixture.root.unmount();
  });
});
