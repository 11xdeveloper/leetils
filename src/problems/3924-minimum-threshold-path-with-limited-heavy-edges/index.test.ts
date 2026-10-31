import { describe, expect, it } from "bun:test";
import { minimumThresholdPathWithLimitedHeavyEdges as minimumThreshold } from ".";

describe("3924. Minimum Threshold Path With Limited Heavy Edges", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			minimumThreshold(
				6,
				[
					[0, 1, 5],
					[1, 2, 3],
					[3, 4, 4],
					[4, 5, 1],
					[1, 4, 2],
				],
				0,
				3,
				1,
			),
		).toBe(4);
		expect(
			minimumThreshold(
				6,
				[
					[0, 1, 3],
					[1, 2, 4],
					[3, 4, 5],
					[4, 5, 6],
				],
				0,
				4,
				1,
			),
		).toBe(-1);
		expect(
			minimumThreshold(
				4,
				[
					[0, 1, 2],
					[1, 2, 2],
					[2, 3, 2],
					[3, 0, 2],
				],
				0,
				0,
				0,
			),
		).toBe(0);
	});
});
