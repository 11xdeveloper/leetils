import { describe, expect, it } from "bun:test";
import { getMaximumInGeneratedArray as getMaximumGenerated } from ".";

describe("1646. Get Maximum in Generated Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(getMaximumGenerated(7)).toBe(3);
		expect(getMaximumGenerated(2)).toBe(1);
		expect(getMaximumGenerated(3)).toBe(2);
	});

	it("handles 0 and 1", () => {
		expect(getMaximumGenerated(0)).toBe(0);
		expect(getMaximumGenerated(1)).toBe(1);
	});
});
