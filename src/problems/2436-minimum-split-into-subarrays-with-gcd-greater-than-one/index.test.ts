import { describe, expect, it } from "bun:test";
import { minimumSplitIntoSubarraysWithGcdGreaterThanOne as minimumSplits } from ".";

describe("2436. Minimum Split Into Subarrays With GCD Greater Than One", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimumSplits([12, 6, 3, 14, 8])).toBe(2);
		expect(minimumSplits([4, 12, 6, 14])).toBe(1);
	});
});
