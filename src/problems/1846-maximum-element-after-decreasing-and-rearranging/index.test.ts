import { describe, expect, it } from "bun:test";
import { maximumElementAfterDecreasingAndRearranging as maximumElementAfterDecrementingAndRearranging } from ".";

describe("1846. Maximum Element After Decreasing and Rearranging", () => {
	it("solves the examples from the problem statement", () => {
		expect(maximumElementAfterDecrementingAndRearranging([2, 2, 1, 2, 1])).toBe(
			2,
		);
		expect(maximumElementAfterDecrementingAndRearranging([100, 1, 1000])).toBe(
			3,
		);
		expect(maximumElementAfterDecrementingAndRearranging([1, 2, 3, 4, 5])).toBe(
			5,
		);
	});
});
