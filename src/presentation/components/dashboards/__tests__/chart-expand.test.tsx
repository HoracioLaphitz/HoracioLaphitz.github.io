// @vitest-environment jsdom

import { describe, expect, it, vi, beforeEach } from "vitest";
import { createRoot } from "react-dom/client";
import { flushSync } from "react-dom";
import { act } from "react";
import { ChartCard } from "@presentation/components/dashboards/shared/ChartCard";
import { ChartModal } from "@presentation/components/dashboards/shared/ChartModal";

// Helpers
function mount(element: React.ReactElement): { container: HTMLElement; root: ReturnType<typeof createRoot>; cleanup: () => void } {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  flushSync(() => root.render(element));
  return {
    container,
    root,
    cleanup: () => {
      flushSync(() => root.unmount());
      document.body.removeChild(container);
    },
  };
}

function findByText(text: string): HTMLElement | null {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let node: Node | null;
  while ((node = walker.nextNode())) {
    if (node.textContent?.includes(text)) {
      return node.parentElement;
    }
  }
  return null;

}

async function waitForCondition(condition: () => boolean, timeout = 1000): Promise<void> {
  const start = Date.now();
  while (!condition() && Date.now() - start < timeout) {
    await new Promise((r) => setTimeout(r, 10));
  }
}

describe("ChartModal", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  it("renders nothing when not mounted", () => {
    const { cleanup } = mount(
      <ChartModal isOpen={false} onClose={() => {}} title="Test">
        <div>Chart content</div>
      </ChartModal>
    );
    expect(document.body.querySelector('[role="dialog"]')).toBeNull();
    cleanup();
  });

  it("renders dialog with title and children when open", () => {
    const { cleanup } = mount(
      <ChartModal isOpen={true} onClose={() => {}} title="Test Chart">
        <div data-testid="chart-content">Chart content</div>
      </ChartModal>
    );

    const dialog = document.body.querySelector('[role="dialog"]');
    expect(dialog).toBeTruthy();
    expect(dialog?.getAttribute("aria-modal")).toBe("true");
    expect(dialog?.getAttribute("aria-label")).toBe("Test Chart");
    expect(findByText("Chart content")).toBeTruthy();
    cleanup();
  });

  it("calls onClose when close button is clicked", () => {
    const onClose = vi.fn();
    const { cleanup } = mount(
      <ChartModal isOpen={true} onClose={onClose} title="Test">
        <div>Chart content</div>
      </ChartModal>
    );

    const closeBtn = document.body.querySelector('[aria-label="Cerrar"]');
    expect(closeBtn).toBeTruthy();
    flushSync(() => {
      act(() => {
        closeBtn!.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      });
    });
    expect(onClose).toHaveBeenCalled();
    cleanup();
  });

  it("calls onClose when overlay is clicked", () => {
    const onClose = vi.fn();
    const { cleanup } = mount(
      <ChartModal isOpen={true} onClose={onClose} title="Test">
        <div>Chart content</div>
      </ChartModal>
    );

    const overlay = document.body.querySelector("[aria-hidden='true']");
    expect(overlay).toBeTruthy();
    flushSync(() => {
      act(() => {
        overlay!.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      });
    });
    expect(onClose).toHaveBeenCalled();
    cleanup();
  });

  it("has correct ARIA attributes", () => {
    const { cleanup } = mount(
      <ChartModal isOpen={true} onClose={() => {}} title="My Chart">
        <div>Chart content</div>
      </ChartModal>
    );

    const dialog = document.body.querySelector('[role="dialog"]');
    expect(dialog).toBeTruthy();
    expect(dialog?.getAttribute("aria-modal")).toBe("true");
    expect(dialog?.getAttribute("aria-label")).toBe("My Chart");
    cleanup();
  });
});

describe("ChartCard expand flow", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  it("shows expand button when expandable=true", () => {
    const { cleanup } = mount(
      <ChartCard title="Test Chart" expandable={true}>
        <div data-testid="chart">Chart</div>
      </ChartCard>
    );

    const btn = document.querySelector('[aria-label="Ampliar Test Chart"]');
    expect(btn).toBeTruthy();
    cleanup();
  });

  it("hides expand button when expandable=false", () => {
    const { cleanup } = mount(
      <ChartCard title="Test Chart" expandable={false}>
        <div data-testid="chart">Chart</div>
      </ChartCard>
    );

    const btn = document.querySelector('[aria-label="Ampliar Test Chart"]');
    expect(btn).toBeNull();
    cleanup();
  });

  it("opens modal when expand button is clicked", () => {
    const { cleanup } = mount(
      <ChartCard title="Test Chart" expandable={true}>
        <div data-testid="chart">Chart</div>
      </ChartCard>
    );

    const expandBtn = document.querySelector('[aria-label="Ampliar Test Chart"]');
    flushSync(() => {
      act(() => {
        expandBtn!.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      });
    });

    const dialog = document.body.querySelector('[role="dialog"]');
    expect(dialog).toBeTruthy();
    cleanup();
  });

  it("closes modal on Escape key", async () => {
    const { cleanup } = mount(
      <ChartCard title="Test Chart" expandable={true}>
        <div data-testid="chart">Chart</div>
      </ChartCard>
    );

    const expandBtn = document.querySelector('[aria-label="Ampliar Test Chart"]');
    flushSync(() => {
      act(() => {
        expandBtn!.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      });
    });

    expect(document.body.querySelector('[role="dialog"]')).toBeTruthy();

    flushSync(() => {
      act(() => {
        document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
      });
    });

    await waitForCondition(() => !document.body.querySelector('[role="dialog"]'));
    expect(document.body.querySelector('[role="dialog"]')).toBeNull();
    cleanup();
  });

  it("restores focus to expand button after closing", async () => {
    const { cleanup } = mount(
      <ChartCard title="Test Chart" expandable={true}>
        <div data-testid="chart">Chart</div>
      </ChartCard>
    );

    const expandBtn = document.querySelector('[aria-label="Ampliar Test Chart"]') as HTMLElement;
    expandBtn.focus();
    expect(document.activeElement).toBe(expandBtn);

    flushSync(() => {
      act(() => {
        expandBtn.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      });
    });

    expect(document.body.querySelector('[role="dialog"]')).toBeTruthy();

    flushSync(() => {
      act(() => {
        document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
      });
    });

    await waitForCondition(() => document.activeElement === expandBtn);
    expect(document.activeElement).toBe(expandBtn);
    cleanup();
  });

  it("shows placeholder in card when modal is open", () => {
    const { cleanup } = mount(
      <ChartCard title="Test Chart" expandable={true}>
        <div data-testid="chart">Chart</div>
      </ChartCard>
    );

    const expandBtn = document.querySelector('[aria-label="Ampliar Test Chart"]');
    flushSync(() => {
      act(() => {
        expandBtn!.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      });
    });

    expect(findByText("Vista expandida")).toBeTruthy();
    cleanup();
  });
});
