import { describe, expect, it } from "bun:test";
import { specialPermutations as specialPerm } from ".";

describe("2741. Special Permutations", () => {
	it("solves the examples from the problem statement", () => {
		expect(specialPerm([2, 3, 6])).toBe(2);
		expect(specialPerm([1, 4, 3])).toBe(2);
	});

	it("counts every ordering of a divisor chain", () => {
		// 1, 2, 4, 8: every pair divides, so all 4! orders work.
		expect(specialPerm([1, 2, 4, 8])).toBe(24);
	});
});
