import { describe, expect, it } from "bun:test";
import { snailTraversal } from ".";

describe("2624. Snail Traversal", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			snailTraversal.call(
				[19, 10, 3, 7, 9, 8, 5, 2, 1, 17, 16, 14, 12, 18, 6, 13, 11, 20, 4, 15],
				5,
				4,
			),
		).toEqual([
			[19, 17, 16, 15],
			[10, 1, 14, 4],
			[3, 2, 12, 20],
			[7, 5, 18, 11],
			[9, 8, 6, 13],
		]);
		expect(snailTraversal.call([1, 2, 3, 4], 1, 4)).toEqual([[1, 2, 3, 4]]);
		expect(snailTraversal.call([1, 3], 2, 2)).toEqual([]);
	});

	it("fills a single column top to bottom", () => {
		expect(snailTraversal.call([1, 2, 3], 3, 1)).toEqual([[1], [2], [3]]);
	});
});
