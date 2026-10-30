import { describe, expect, it } from "bun:test";
import { findCommonElementsBetweenTwoArrays as findIntersectionValues } from ".";

describe("2956. Find Common Elements Between Two Arrays", () => {
	it("solves the examples from the problem statement", () => {
		expect(findIntersectionValues([4, 3, 2, 3, 1], [2, 2, 5, 2, 3, 6])).toEqual(
			[3, 4],
		);
		expect(findIntersectionValues([3, 4, 2, 3], [1, 5])).toEqual([0, 0]);
	});
});
