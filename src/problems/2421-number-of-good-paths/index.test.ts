import { describe, expect, it } from "bun:test";
import { numberOfGoodPaths } from ".";

describe("2421. Number of Good Paths", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			numberOfGoodPaths(
				[1, 3, 2, 1, 3],
				[
					[0, 1],
					[0, 2],
					[2, 3],
					[2, 4],
				],
			),
		).toBe(6);
		expect(
			numberOfGoodPaths(
				[1, 1, 2, 2, 3],
				[
					[0, 1],
					[1, 2],
					[2, 3],
					[2, 4],
				],
			),
		).toBe(7);
		expect(numberOfGoodPaths([1], [])).toBe(1);
	});
});
