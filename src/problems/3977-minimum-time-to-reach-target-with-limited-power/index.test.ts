import { describe, expect, it } from "bun:test";
import { minimumTimeToReachTargetWithLimitedPower as minTimeMaxPower } from ".";

describe("3977. Minimum Time to Reach Target With Limited Power", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			minTimeMaxPower(
				5,
				[
					[0, 1, 1],
					[1, 4, 1],
					[0, 2, 1],
					[2, 3, 1],
					[3, 4, 1],
				],
				4,
				[2, 3, 1, 1, 1],
				0,
				4,
			),
		).toEqual([3, 0]);
		expect(
			minTimeMaxPower(
				3,
				[
					[0, 1, 2],
					[1, 2, 2],
					[2, 0, 2],
				],
				3,
				[1, 1, 1],
				1,
				1,
			),
		).toEqual([0, 3]);
		expect(
			minTimeMaxPower(
				4,
				[
					[0, 1, 3],
					[2, 3, 4],
				],
				3,
				[1, 1, 1, 1],
				0,
				3,
			),
		).toEqual([-1, -1]);
	});
});
