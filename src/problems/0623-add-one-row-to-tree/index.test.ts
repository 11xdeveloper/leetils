import { describe, expect, it } from "bun:test";
import {
	TreeNode,
	treeFromArray,
	treeToArray,
} from "../../structures/tree-node";
import { createRandom } from "../../testing/random";
import { randomTree } from "../../testing/trees";
import { addOneRowToTree as addOneRow } from ".";

/** Rebuilds the tree recursively with the new row. */
const byRecursion = (
	node: TreeNode | null,
	val: number,
	depth: number,
	side: "left" | "right" = "left",
): TreeNode | null => {
	if (depth === 1)
		return side === "left"
			? new TreeNode(val, node)
			: new TreeNode(val, null, node);
	if (!node) return null;
	return new TreeNode(
		node.val,
		byRecursion(node.left, val, depth - 1, "left"),
		byRecursion(node.right, val, depth - 1, "right"),
	);
};

describe("623. Add One Row to Tree", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			treeToArray(addOneRow(treeFromArray([4, 2, 6, 3, 1, 5]), 1, 2)),
		).toEqual([4, 1, 1, 2, null, null, 6, 3, 1, 5]);
		expect(
			treeToArray(addOneRow(treeFromArray([4, 2, null, 3, 1]), 1, 3)),
		).toEqual([4, 2, null, 1, 1, 3, null, null, 1]);
	});

	it("makes a new root at depth 1", () => {
		expect(treeToArray(addOneRow(treeFromArray([1, 2]), 5, 1))).toEqual([
			5,
			1,
			null,
			2,
		]);
	});

	it("matches recursion on random trees", () => {
		const random = createRandom(623);
		for (let run = 0; run < 500; run++) {
			const root = randomTree(random, 15, 0, 9);
			if (!root) continue;
			const depth = random.int(1, 5);
			const expected = treeToArray(byRecursion(root, 7, depth));
			expect(treeToArray(addOneRow(root, 7, depth))).toEqual(expected);
		}
	});
});
