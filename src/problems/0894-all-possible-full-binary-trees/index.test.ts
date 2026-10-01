import { describe, expect, it } from "bun:test";
import { type TreeNode, treeToArray } from "../../structures/tree-node";
import { nodesOf } from "../../testing/trees";
import { allPossibleFullBinaryTrees as allPossibleFBT } from ".";

describe("894. All Possible Full Binary Trees", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			allPossibleFBT(7)
				.map((tree) => JSON.stringify(treeToArray(tree)))
				.sort(),
		).toEqual(
			[
				[0, 0, 0, null, null, 0, 0, null, null, 0, 0],
				[0, 0, 0, null, null, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, null, null, null, null, 0, 0],
				[0, 0, 0, 0, 0, null, null, 0, 0],
			]
				.map((tree) => JSON.stringify(tree))
				.sort(),
		);
		expect(allPossibleFBT(3).map(treeToArray)).toEqual([[0, 0, 0]]);
		expect(allPossibleFBT(4)).toEqual([]);
	});

	it("gives the Catalan number of distinct full trees, sharing no nodes", () => {
		const catalan = [1, 1, 2, 5, 14, 42, 132, 429, 1430, 4862];
		for (let n = 1; n <= 19; n += 2) {
			const trees = allPossibleFBT(n);
			expect(trees).toHaveLength(catalan[(n - 1) / 2] ?? 0);
			expect(
				new Set(trees.map((tree) => JSON.stringify(treeToArray(tree)))).size,
			).toBe(trees.length);
			const nodes = trees.flatMap((tree) => nodesOf(tree));
			expect(new Set<TreeNode>(nodes).size).toBe(nodes.length);
			for (const node of nodes)
				expect(node.left === null).toBe(node.right === null);
		}
	});
});
