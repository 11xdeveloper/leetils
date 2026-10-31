import { describe, expect, it } from "bun:test";
import { closestNodeToPathInTree as closestNode } from ".";

describe("2277. Closest Node to Path in Tree", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			closestNode(
				7,
				[
					[0, 1],
					[0, 2],
					[0, 3],
					[1, 4],
					[2, 5],
					[2, 6],
				],
				[
					[5, 3, 4],
					[5, 3, 6],
				],
			),
		).toEqual([0, 2]);
		expect(
			closestNode(
				3,
				[
					[0, 1],
					[1, 2],
				],
				[[0, 1, 2]],
			),
		).toEqual([1]);
		expect(
			closestNode(
				3,
				[
					[0, 1],
					[1, 2],
				],
				[[0, 0, 0]],
			),
		).toEqual([0]);
	});
});
