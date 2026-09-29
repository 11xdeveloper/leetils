import { describe, expect, it } from "bun:test";
import { TreeNode, treeFromArray } from "../../structures/tree-node";
import { createRandom } from "../../testing/random";
import { nodesOf, randomTree } from "../../testing/trees";
import { findLeavesOfBinaryTree as findLeaves } from ".";

/** Actually removes the leaves round by round, from copies of the nodes. */
const byRemoving = (root: TreeNode | null): number[][] => {
	const copy = (node: TreeNode | null): TreeNode | null =>
		node && new TreeNode(node.val, copy(node.left), copy(node.right));
	let tree = copy(root);
	const rounds: number[][] = [];
	const strip = (node: TreeNode | null, round: number[]): TreeNode | null => {
		if (!node) return null;
		if (!node.left && !node.right) {
			round.push(node.val);
			return null;
		}
		node.left = strip(node.left, round);
		node.right = strip(node.right, round);
		return node;
	};
	while (tree) {
		const round: number[] = [];
		tree = strip(tree, round);
		rounds.push(round);
	}
	return rounds;
};

describe("366. Find Leaves of Binary Tree", () => {
	it("solves the examples from the problem statement", () => {
		expect(findLeaves(treeFromArray([1, 2, 3, 4, 5]))).toEqual([
			[4, 5, 3],
			[2],
			[1],
		]);
		expect(findLeaves(treeFromArray([1]))).toEqual([[1]]);
	});

	it("matches removing leaves round by round on random trees", () => {
		const random = createRandom(366);
		for (let run = 0; run < 500; run++) {
			const root = randomTree(random, 25, -100, 100);
			expect(findLeaves(root)).toEqual(byRemoving(root));
			expect(findLeaves(root).flat()).toHaveLength(nodesOf(root).length);
		}
	});
});
