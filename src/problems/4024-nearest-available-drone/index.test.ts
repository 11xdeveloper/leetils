import { describe, expect, it } from "bun:test";
import { nearestAvailableDrone as nearestDrone } from ".";

describe("4024. Nearest Available Drone", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			nearestDrone(
				[
					[0, 0, 8],
					[2, 2, 9],
				],
				[3, 4],
			),
		).toBe(1);
		expect(
			nearestDrone(
				[
					[2, 1, 5],
					[4, 4, 5],
					[6, 6, 8],
				],
				[5, 5],
			),
		).toBe(1);
		expect(nearestDrone([[4, 4, 5]], [8, 6])).toBe(-1);
	});
});
