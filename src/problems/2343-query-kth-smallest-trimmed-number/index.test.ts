import { describe, expect, it } from "bun:test";
import { queryKthSmallestTrimmedNumber as smallestTrimmedNumbers } from ".";

describe("2343. Query Kth Smallest Trimmed Number", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			smallestTrimmedNumbers(
				["102", "473", "251", "814"],
				[
					[1, 1],
					[2, 3],
					[4, 2],
					[1, 2],
				],
			),
		).toEqual([2, 2, 1, 0]);
		expect(
			smallestTrimmedNumbers(
				["24", "37", "96", "04"],
				[
					[2, 1],
					[2, 2],
				],
			),
		).toEqual([3, 0]);
	});
});
