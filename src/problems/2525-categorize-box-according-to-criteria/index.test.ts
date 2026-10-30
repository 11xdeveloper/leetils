import { describe, expect, it } from "bun:test";
import { categorizeBoxAccordingToCriteria as categorizeBox } from ".";

describe("2525. Categorize Box According to Criteria", () => {
	it("solves the examples from the problem statement", () => {
		expect(categorizeBox(1000, 35, 700, 300)).toBe("Heavy");
		expect(categorizeBox(200, 50, 800, 50)).toBe("Neither");
	});

	it("recognises bulky boxes", () => {
		expect(categorizeBox(10_000, 1, 1, 1)).toBe("Bulky");
		expect(categorizeBox(1000, 1000, 1000, 100)).toBe("Both");
	});
});
