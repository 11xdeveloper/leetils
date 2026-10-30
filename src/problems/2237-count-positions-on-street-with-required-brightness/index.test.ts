import { describe, expect, it } from "bun:test";
import { countPositionsOnStreetWithRequiredBrightness as meetRequirement } from ".";

describe("2237. Count Positions on Street With Required Brightness", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			meetRequirement(
				5,
				[
					[0, 1],
					[2, 1],
					[3, 2],
				],
				[0, 2, 1, 4, 1],
			),
		).toBe(4);
		expect(meetRequirement(1, [[0, 1]], [2])).toBe(0);
	});
});
