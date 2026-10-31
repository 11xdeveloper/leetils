import { describe, expect, it } from "bun:test";
import { minimumSwapsToSortByDigitSum as minSwaps } from ".";

describe("3551. Minimum Swaps to Sort by Digit Sum", () => {
	it("solves the examples from the problem statement", () => {
		expect(minSwaps([37, 100])).toBe(1);
		expect(minSwaps([22, 14, 33, 7])).toBe(0);
		expect(minSwaps([18, 43, 34, 16])).toBe(2);
	});
});
