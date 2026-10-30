import { describe, expect, it } from "bun:test";
import { leftAndRightSumDifferences as leftRightDifference } from ".";

describe("2574. Left and Right Sum Differences", () => {
	it("solves the examples from the problem statement", () => {
		expect(leftRightDifference([10, 4, 8, 3])).toEqual([15, 1, 11, 22]);
		expect(leftRightDifference([1])).toEqual([0]);
	});
});
