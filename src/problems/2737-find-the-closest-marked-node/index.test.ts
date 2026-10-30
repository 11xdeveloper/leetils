import { describe, expect, it } from "bun:test";
import { findTheClosestMarkedNode as minimumDistance } from ".";

describe("2737. Find the Closest Marked Node", () => {
	it("solves the example from the problem statement", () => {
		expect(
			minimumDistance(
				4,
				[
					[0, 1, 1],
					[1, 2, 3],
					[2, 3, 2],
					[0, 3, 4],
				],
				0,
				[2, 3],
			),
		).toBe(4);
	});

	it("follows edges in their direction only", () => {
		const edges = [
			[0, 1, 2],
			[0, 2, 4],
			[1, 3, 1],
			[2, 4, 3],
		];
		expect(minimumDistance(5, edges, 0, [4])).toBe(7);
		expect(minimumDistance(5, edges, 1, [0, 4])).toBe(-1);
	});
});
