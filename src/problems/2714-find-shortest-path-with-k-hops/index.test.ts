import { describe, expect, it } from "bun:test";
import { findShortestPathWithKHops as shortestPathWithHops } from ".";

describe("2714. Find Shortest Path with K Hops", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			shortestPathWithHops(
				4,
				[
					[0, 1, 4],
					[0, 2, 2],
					[2, 3, 6],
				],
				1,
				3,
				2,
			),
		).toBe(2);
		expect(
			shortestPathWithHops(
				7,
				[
					[3, 1, 9],
					[3, 2, 4],
					[4, 0, 9],
					[0, 5, 6],
					[3, 6, 2],
					[6, 0, 4],
					[1, 2, 4],
				],
				4,
				1,
				2,
			),
		).toBe(6);
		expect(
			shortestPathWithHops(
				5,
				[
					[0, 4, 2],
					[0, 1, 3],
					[0, 2, 1],
					[2, 1, 4],
					[1, 3, 4],
					[3, 4, 7],
				],
				2,
				3,
				1,
			),
		).toBe(3);
	});
});
