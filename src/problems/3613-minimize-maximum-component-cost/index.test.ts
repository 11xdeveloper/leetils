import { describe, expect, it } from "bun:test";
import { minimizeMaximumComponentCost as minCost } from ".";

describe("3613. Minimize Maximum Component Cost", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			minCost(
				5,
				[
					[0, 1, 4],
					[1, 2, 3],
					[1, 3, 2],
					[3, 4, 6],
				],
				2,
			),
		).toBe(4);
		expect(
			minCost(
				4,
				[
					[0, 1, 5],
					[1, 2, 5],
					[2, 3, 5],
				],
				1,
			),
		).toBe(5);
	});

	it("costs nothing when no edges are needed", () => {
		expect(minCost(3, [[0, 1, 9]], 3)).toBe(0);
	});
});
