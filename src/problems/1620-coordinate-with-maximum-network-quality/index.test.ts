import { describe, expect, it } from "bun:test";
import { coordinateWithMaximumNetworkQuality as bestCoordinate } from ".";

describe("1620. Coordinate With Maximum Network Quality", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			bestCoordinate(
				[
					[1, 2, 5],
					[2, 1, 7],
					[3, 1, 9],
				],
				2,
			),
		).toEqual([2, 1]);
		expect(bestCoordinate([[23, 11, 21]], 9)).toEqual([23, 11]);
		expect(
			bestCoordinate(
				[
					[1, 2, 13],
					[2, 1, 7],
					[0, 1, 9],
				],
				2,
			),
		).toEqual([1, 2]);
	});

	it("returns the origin when no signal reaches anywhere", () => {
		expect(bestCoordinate([[5, 5, 0]], 3)).toEqual([0, 0]);
	});
});
