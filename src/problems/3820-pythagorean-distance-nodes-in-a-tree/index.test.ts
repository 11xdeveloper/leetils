import { describe, expect, it } from "bun:test";
import { pythagoreanDistanceNodesInATree as specialNodes } from ".";

describe("3820. Pythagorean Distance Nodes in a Tree", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			specialNodes(
				4,
				[
					[0, 1],
					[0, 2],
					[0, 3],
				],
				1,
				2,
				3,
			),
		).toBe(3);
		expect(
			specialNodes(
				4,
				[
					[0, 1],
					[1, 2],
					[2, 3],
				],
				0,
				3,
				2,
			),
		).toBe(0);
		expect(
			specialNodes(
				4,
				[
					[0, 1],
					[1, 2],
					[1, 3],
				],
				1,
				3,
				0,
			),
		).toBe(1);
	});
});
