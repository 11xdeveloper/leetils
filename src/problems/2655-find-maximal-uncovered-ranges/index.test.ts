import { describe, expect, it } from "bun:test";
import { findMaximalUncoveredRanges } from ".";

describe("2655. Find Maximal Uncovered Ranges", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			findMaximalUncoveredRanges(10, [
				[3, 5],
				[7, 8],
			]),
		).toEqual([
			[0, 2],
			[6, 6],
			[9, 9],
		]);
		expect(findMaximalUncoveredRanges(3, [[0, 2]])).toEqual([]);
		expect(
			findMaximalUncoveredRanges(7, [
				[2, 4],
				[0, 3],
			]),
		).toEqual([[5, 6]]);
	});
});
