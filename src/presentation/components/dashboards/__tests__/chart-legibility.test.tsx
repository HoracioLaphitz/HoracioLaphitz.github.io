// @vitest-environment jsdom

import { describe, expect, it, vi, beforeEach } from "vitest";
import { createRoot } from "react-dom/client";
import { flushSync } from "react-dom";
import { act } from "react";
import { CustomTooltip } from "@presentation/components/dashboards/shared/CustomTooltip";
import { ChartCard } from "@presentation/components/dashboards/shared/ChartCard";
import ZoomableImage from "@presentation/components/proyectos/ZoomableImage";
import { DataTable } from "@presentation/components/dashboards/shared/DataTable";

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

describe("CustomTooltip", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  it("renders label when active=true", () => {
    const { cleanup } = mount(
      <CustomTooltip
        active={true}
        payload={[{ value: 3.6, name: "ratio", dataKey: "ratio", color: "#fff" }]}
        label="Enero"
      />
    );

    expect(findByText("Enero")).toBeTruthy();
    cleanup();
  });

  it("renders value + unit (e.g. '3.6x')", () => {
    const { cleanup } = mount(
      <CustomTooltip
        active={true}
        payload={[{ value: 3.6, name: "ratio", dataKey: "ratio", color: "#fff" }]}
        label="Enero"
        unit="x"
      />
    );

    expect(findByText("3.6")?.textContent).toContain("3.6x");
    cleanup();
  });

  it("renders context when provided", () => {
    const { cleanup } = mount(
      <CustomTooltip
        active={true}
        payload={[{ value: 3.6, name: "ratio", dataKey: "ratio", color: "#fff" }]}
        label="Enero"
        context="vs. año anterior"
      />
    );

    expect(findByText("vs. año anterior")).toBeTruthy();
    cleanup();
  });

  it("renders nothing when active=false", () => {
    const { cleanup } = mount(
      <CustomTooltip
        active={false}
        payload={[{ value: 3.6, name: "ratio", dataKey: "ratio", color: "#fff" }]}
        label="Enero"
      />
    );

    expect(findByText("Enero")).toBeNull();
    cleanup();
  });
});

describe("ChartCard with dataPoints", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  it("dataPoints=5 → height contains 'rem'", () => {
    const { cleanup } = mount(
      <ChartCard title="Test" dataPoints={5}>
        <div>Chart</div>
      </ChartCard>
    );

    const region = document.querySelector('[data-responsive-region="chart-card"]');
    const innerDiv = region?.querySelector("div[style*='height']");
    expect(innerDiv?.getAttribute("style")).toContain("rem");
    cleanup();
  });

  it("dataPoints=15 → height contains 'rem'", () => {
    const { cleanup } = mount(
      <ChartCard title="Test" dataPoints={15}>
        <div>Chart</div>
      </ChartCard>
    );

    const region = document.querySelector('[data-responsive-region="chart-card"]');
    const innerDiv = region?.querySelector("div[style*='height']");
    expect(innerDiv?.getAttribute("style")).toContain("rem");
    cleanup();
  });

  it("without dataPoints → fallback height contains 'rem'", () => {
    const { cleanup } = mount(
      <ChartCard title="Test">
        <div>Chart</div>
      </ChartCard>
    );

    const region = document.querySelector('[data-responsive-region="chart-card"]');
    const innerDiv = region?.querySelector("div[style*='height']");
    expect(innerDiv?.getAttribute("style")).toContain("rem");
    cleanup();
  });

  it("renders description when provided", () => {
    const { cleanup } = mount(
      <ChartCard title="Test" description="Ganancia neta anual">
        <div>Chart</div>
      </ChartCard>
    );

    expect(findByText("Ganancia neta anual")).toBeTruthy();
    cleanup();
  });
});

describe("ZoomableImage", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  it("click on img opens lightbox (role=dialog appears)", () => {
    const { cleanup } = mount(
      <ZoomableImage src="/test.png" alt="Test image" />
    );

    const trigger = document.querySelector('[aria-label="Ampliar imagen: Test image"]');
    expect(trigger).toBeTruthy();
    expect(document.body.querySelector('[role="dialog"]')).toBeNull();

    flushSync(() => {
      act(() => {
        trigger!.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      });
    });

    expect(document.body.querySelector('[role="dialog"]')).toBeTruthy();
    cleanup();
  });

  it("Escape closes lightbox", async () => {
    const { cleanup } = mount(
      <ZoomableImage src="/test.png" alt="Test image" />
    );

    const trigger = document.querySelector('[aria-label="Ampliar imagen: Test image"]');
    flushSync(() => {
      act(() => {
        trigger!.dispatchEvent(new MouseEvent("click", { bubbles: true }));
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

  it("focus restored to trigger after closing", async () => {
    const { cleanup } = mount(
      <ZoomableImage src="/test.png" alt="Test image" />
    );

    const trigger = document.querySelector('[aria-label="Ampliar imagen: Test image"]') as HTMLElement;
    trigger.focus();
    expect(document.activeElement).toBe(trigger);

    flushSync(() => {
      act(() => {
        trigger.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      });
    });

    expect(document.body.querySelector('[role="dialog"]')).toBeTruthy();

    flushSync(() => {
      act(() => {
        document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
      });
    });

    await waitForCondition(() => document.activeElement === trigger);
    expect(document.activeElement).toBe(trigger);
    cleanup();
  });

  it("caption renders when alt exists", () => {
    const { cleanup } = mount(
      <ZoomableImage src="/test.png" alt="Descripción de la imagen" />
    );

    const trigger = document.querySelector('[aria-label="Ampliar imagen: Descripción de la imagen"]');
    flushSync(() => {
      act(() => {
        trigger!.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      });
    });

    expect(findByText("Descripción de la imagen")).toBeTruthy();
    cleanup();
  });
});

describe("DataTable", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  it("renders children (table rows)", () => {
    const { cleanup } = mount(
      <DataTable>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Item 1</td>
            <td>100</td>
          </tr>
        </tbody>
      </DataTable>
    );

    expect(findByText("Nombre")).toBeTruthy();
    expect(findByText("Item 1")).toBeTruthy();
    expect(findByText("100")).toBeTruthy();
    cleanup();
  });

  it("renders description when provided", () => {
    const { cleanup } = mount(
      <DataTable description="Resumen de métricas">
        <tbody>
          <tr>
            <td>Data</td>
          </tr>
        </tbody>
      </DataTable>
    );

    expect(findByText("Resumen de métricas")).toBeTruthy();
    cleanup();
  });

  it("sticky header (thead th has sticky class)", () => {
    const { cleanup } = mount(
      <DataTable>
        <thead>
          <tr>
            <th>Columna A</th>
            <th>Columna B</th>
          </tr>
        </thead>
      </DataTable>
    );

    const table = document.querySelector("table");
    const className = table?.className ?? "";
    expect(className).toContain("sticky");
    cleanup();
  });
});