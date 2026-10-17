import { describe, expect, it } from "bun:test";
import { secondMinimumTimeToReachDestination as secondMinimum } from ".";

describe("2045. Second Minimum Time to Reach Destination", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			secondMinimum(
				5,
				[
					[1, 2],
					[1, 3],
					[1, 4],
					[3, 4],
					[4, 5],
				],
				3,
				5,
			),
		).toBe(13);
		expect(secondMinimum(2, [[1, 2]], 3, 2)).toBe(11);
	});

	it("goes back and forth when no longer simple path exists", () => {
		// Paths of 2 and 4 edges: 1-2-3 and 1-2-1-2-3.
		expect(
			secondMinimum(
				3,
				[
					[1, 2],
					[2, 3],
				],
				1,
				10,
			),
		).toBe(4);
	});
});
