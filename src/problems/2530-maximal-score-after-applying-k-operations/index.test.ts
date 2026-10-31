import { describe, expect, it } from "bun:test";
import { maximalScoreAfterApplyingKOperations as maxKelements } from ".";

describe("2530. Maximal Score After Applying K Operations", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxKelements([10, 10, 10, 10, 10], 5)).toBe(50);
		expect(maxKelements([1, 10, 3, 3, 3], 3)).toBe(17);
	});
});
