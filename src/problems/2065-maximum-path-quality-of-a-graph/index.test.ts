import { describe, expect, it } from "bun:test";
import { maximumPathQualityOfAGraph as maxPathQuality } from ".";

describe("2065. Maximum Path Quality of a Graph", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			maxPathQuality(
				[0, 32, 10, 43],
				[
					[0, 1, 10],
					[1, 2, 15],
					[0, 3, 10],
				],
				49,
			),
		).toBe(75);
		expect(
			maxPathQuality(
				[5, 10, 15, 20],
				[
					[0, 1, 10],
					[1, 2, 10],
					[0, 3, 10],
				],
				30,
			),
		).toBe(25);
		expect(
			maxPathQuality(
				[1, 2, 3, 4],
				[
					[0, 1, 10],
					[1, 2, 11],
					[2, 3, 12],
					[1, 3, 13],
				],
				50,
			),
		).toBe(7);
	});

	it("scores just the start when nothing is reachable in time", () => {
		expect(maxPathQuality([7, 100], [[0, 1, 60]], 100)).toBe(7);
	});
});
