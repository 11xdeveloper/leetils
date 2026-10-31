import { describe, expect, it } from "bun:test";
import { minimumRectanglesToCoverPoints as minRectanglesToCoverPoints } from ".";

describe("3111. Minimum Rectangles to Cover Points", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			minRectanglesToCoverPoints(
				[
					[2, 1],
					[1, 0],
					[1, 4],
					[1, 8],
					[3, 5],
					[4, 6],
				],
				1,
			),
		).toBe(2);
		expect(
			minRectanglesToCoverPoints(
				[
					[0, 0],
					[1, 1],
					[2, 2],
					[3, 3],
					[4, 4],
					[5, 5],
					[6, 6],
				],
				2,
			),
		).toBe(3);
		expect(
			minRectanglesToCoverPoints(
				[
					[2, 3],
					[1, 2],
				],
				0,
			),
		).toBe(2);
	});
});
