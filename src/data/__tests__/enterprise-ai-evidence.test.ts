import { describe, expect, it } from "vitest";
import {
  ALLOWED_MATURITY_STATUSES,
  ENTERPRISE_AI_EVIDENCE,
  resolveClaim,
} from "../enterprise-ai-evidence.v1";

describe("enterprise AI evidence contract", () => {
  it("uses stable IDs and the approved maturity vocabulary", () => {
    expect(ENTERPRISE_AI_EVIDENCE.length).toBeGreaterThan(0);
    for (const item of ENTERPRISE_AI_EVIDENCE) {
      expect(item.claimId).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
      expect(item.sources.length).toBeGreaterThan(0);
      expect(item.sources.every((source) => source.startsWith("src/"))).toBe(true);
      expect(item.status).toBeDefined();
      expect(ALLOWED_MATURITY_STATUSES).toContain(item.status);
    }
  });

  it("rejects an unknown claim", () => {
    expect(() => resolveClaim({ claimId: "missing" })).toThrow(
      /unknown claim/i,
    );
  });

  it("contains the Agentic AI capability cards with their approved statuses", () => {
    const expectedCards = [
      {
        claimId: "agent-interoperability-protocols",
        status: "Actualmente profundizando conocimientos en",
        scope: "Estudio de MCP y A2A",
        sources: ["src/data/profile-data.ts"],
      },
      {
        claimId: "multi-agent-framework-selection-and-evaluation",
        status: "Actualmente profundizando conocimientos en",
        scope: "Comparación de frameworks para flujos con agentes",
        sources: ["src/data/profile-data.ts"],
      },
    ] as const;

    for (const expected of expectedCards) {
      const card = ENTERPRISE_AI_EVIDENCE.find(({ claimId }) => claimId === expected.claimId);
      expect(card).toMatchObject(expected);
    }
  });
});
