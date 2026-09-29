import { describe, expect, it } from "bun:test";
import { naryTreeFromArray } from "../../structures/nary-tree-node";
import { nAryTreeLevelOrderTraversal as levelOrder } from ".";

describe("429. N-ary Tree Level Order Traversal", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			levelOrder(naryTreeFromArray([1, null, 3, 2, 4, null, 5, 6])),
		).toEqual([[1], [3, 2, 4], [5, 6]]);
		expect(
			levelOrder(
				naryTreeFromArray([
					1,
					null,
					2,
					3,
					4,
					5,
					null,
					null,
					6,
					7,
					null,
					8,
					null,
					9,
					10,
					null,
					null,
					11,
					null,
					12,
					null,
					13,
					null,
					null,
					14,
				]),
			),
		).toEqual([[1], [2, 3, 4, 5], [6, 7, 8, 9, 10], [11, 12, 13], [14]]);
	});

	it("returns nothing for an empty tree", () => {
		expect(levelOrder(null)).toEqual([]);
	});

	it("handles a tree 1000 levels deep", () => {
		const values: (number | null)[] = [0, null];
		for (let depth = 1; depth < 1000; depth++) values.push(depth, null);
		expect(levelOrder(naryTreeFromArray(values))).toHaveLength(1000);
	});
});
