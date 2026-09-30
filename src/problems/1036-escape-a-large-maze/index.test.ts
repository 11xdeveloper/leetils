import { describe, expect, it } from "bun:test";
import { escapeALargeMaze as isEscapePossible } from ".";

describe("1036. Escape a Large Maze", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			isEscapePossible(
				[
					[0, 1],
					[1, 0],
				],
				[0, 0],
				[0, 2],
			),
		).toBeFalse();
		expect(isEscapePossible([], [0, 0], [999999, 999999])).toBeTrue();
	});

	it("detects a target walled into a corner", () => {
		// A diagonal wall of 200 squares encloses the corner at the origin.
		const wall = Array.from({ length: 200 }, (_, i) => [i, 199 - i]);
		expect(isEscapePossible(wall, [0, 0], [500, 500])).toBeFalse();
		expect(isEscapePossible(wall, [500, 500], [0, 0])).toBeFalse();
		expect(isEscapePossible(wall, [1, 1], [10, 10])).toBeTrue();
		expect(isEscapePossible(wall, [500, 500], [600, 600])).toBeTrue();
	});
});
