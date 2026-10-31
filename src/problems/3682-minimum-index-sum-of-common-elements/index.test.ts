import { describe, expect, it } from "bun:test";
import { minimumIndexSumOfCommonElements as minimumSum } from ".";

describe("3682. Minimum Index Sum of Common Elements", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimumSum([3, 2, 1], [1, 3, 1])).toBe(1);
		expect(minimumSum([5, 1, 2], [2, 1, 3])).toBe(2);
		expect(minimumSum([6, 4], [7, 8])).toBe(-1);
	});
});
