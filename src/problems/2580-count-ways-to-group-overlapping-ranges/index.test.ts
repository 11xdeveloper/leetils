import { describe, expect, it } from "bun:test";
import { countWaysToGroupOverlappingRanges as countWays } from ".";

describe("2580. Count Ways to Group Overlapping Ranges", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			countWays([
				[6, 10],
				[5, 15],
			]),
		).toBe(2);
		expect(
			countWays([
				[1, 3],
				[10, 20],
				[2, 5],
				[4, 8],
			]),
		).toBe(4);
	});

	it("treats touching ranges as overlapping", () => {
		expect(
			countWays([
				[0, 2],
				[2, 3],
			]),
		).toBe(2);
	});
});
