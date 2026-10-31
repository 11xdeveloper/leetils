import { describe, expect, it } from "bun:test";
import { shortestPathWithAtMostKConsecutiveIdenticalCharacters as shortestPath } from ".";

describe("3970. Shortest Path With At Most K Consecutive Identical Characters", () => {
	it("solves the examples from the problem statement", () => {
		const edges = [
			[0, 1, 1],
			[1, 2, 1],
			[0, 2, 3],
		];
		expect(shortestPath(3, edges, "aab", 1)).toBe(3);
		expect(shortestPath(3, edges, "aab", 2)).toBe(2);
		expect(
			shortestPath(
				3,
				[
					[0, 1, 1],
					[1, 2, 1],
				],
				"aaa",
				2,
			),
		).toBe(-1);
	});

	it("needs no edges for a single node", () => {
		expect(shortestPath(1, [], "a", 1)).toBe(0);
	});
});
