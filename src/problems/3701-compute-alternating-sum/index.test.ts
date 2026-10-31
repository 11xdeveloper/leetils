import { describe, expect, it } from "bun:test";
import { computeAlternatingSum as alternatingSum } from ".";

describe("3701. Compute Alternating Sum", () => {
	it("solves the examples from the problem statement", () => {
		expect(alternatingSum([1, 3, 5, 7])).toBe(-4);
		expect(alternatingSum([100])).toBe(100);
	});
});
