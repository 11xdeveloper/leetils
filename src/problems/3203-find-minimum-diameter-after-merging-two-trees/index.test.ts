import { describe, expect, it } from "bun:test";
import { findMinimumDiameterAfterMergingTwoTrees as minimumDiameterAfterMerge } from ".";

describe("3203. Find Minimum Diameter After Merging Two Trees", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			minimumDiameterAfterMerge(
				[
					[0, 1],
					[0, 2],
					[0, 3],
				],
				[[0, 1]],
			),
		).toBe(3);
		expect(
			minimumDiameterAfterMerge(
				[
					[0, 1],
					[0, 2],
					[0, 3],
					[2, 4],
					[2, 5],
					[3, 6],
					[2, 7],
				],
				[
					[0, 1],
					[0, 2],
					[0, 3],
					[2, 4],
					[2, 5],
					[3, 6],
					[2, 7],
				],
			),
		).toBe(5);
	});

	it("handles single nodes and long paths", () => {
		expect(minimumDiameterAfterMerge([], [])).toBe(1);
		const path = Array.from({ length: 9 }, (_, i) => [i, i + 1]);
		expect(minimumDiameterAfterMerge(path, [])).toBe(9);
	});
});
