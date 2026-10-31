import { describe, expect, it } from "bun:test";
import { splitAndMergeArrayTransformation as minSplitMerge } from ".";

describe("3690. Split and Merge Array Transformation", () => {
	it("solves the examples from the problem statement", () => {
		expect(minSplitMerge([3, 1, 2], [1, 2, 3])).toBe(1);
		expect(minSplitMerge([1, 1, 2, 3, 4, 5], [5, 4, 3, 2, 1, 1])).toBe(3);
	});

	it("needs nothing for equal arrays", () => {
		expect(minSplitMerge([1, 2], [1, 2])).toBe(0);
	});
});
