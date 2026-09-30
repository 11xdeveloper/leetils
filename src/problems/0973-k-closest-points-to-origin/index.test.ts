import { describe, expect, it } from "bun:test";
import { kClosestPointsToOrigin as kClosest } from ".";

describe("973. K Closest Points to Origin", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			kClosest(
				[
					[1, 3],
					[-2, 2],
				],
				1,
			),
		).toEqual([[-2, 2]]);
		expect(
			kClosest(
				[
					[3, 3],
					[5, -1],
					[-2, 4],
				],
				2,
			)
				.map((p) => p.join())
				.sort(),
		).toEqual(["-2,4", "3,3"]);
	});
});
