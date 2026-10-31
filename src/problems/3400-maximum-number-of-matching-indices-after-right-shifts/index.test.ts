import { describe, expect, it } from "bun:test";
import { maximumNumberOfMatchingIndicesAfterRightShifts as maximumMatchingIndices } from ".";

describe("3400. Maximum Number of Matching Indices After Right Shifts", () => {
	it("solves the examples from the problem statement", () => {
		expect(maximumMatchingIndices([3, 1, 2, 3, 1, 2], [1, 2, 3, 1, 2, 3])).toBe(
			6,
		);
		expect(maximumMatchingIndices([1, 4, 2, 5, 3, 1], [2, 3, 1, 2, 4, 6])).toBe(
			3,
		);
	});
});
