import { describe, expect, it } from "bun:test";
import { minimumTimeToVisitDisappearingNodes as minimumTime } from ".";

describe("3112. Minimum Time to Visit Disappearing Nodes", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			minimumTime(
				3,
				[
					[0, 1, 2],
					[1, 2, 1],
					[0, 2, 4],
				],
				[1, 1, 5],
			),
		).toEqual([0, -1, 4]);
		expect(
			minimumTime(
				3,
				[
					[0, 1, 2],
					[1, 2, 1],
					[0, 2, 4],
				],
				[1, 3, 5],
			),
		).toEqual([0, 2, 3]);
		expect(minimumTime(2, [[0, 1, 1]], [1, 1])).toEqual([0, -1]);
	});
});
