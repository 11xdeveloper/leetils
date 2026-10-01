import { describe, expect, it } from "bun:test";
import { TreeNode, treeFromArray } from "../../structures/tree-node";
import { createRandom } from "../../testing/random";
import { nodesOf, randomTree } from "../../testing/trees";
import { houseRobberIII } from ".";

/** Tries every set of houses with no parent and child both taken. */
const byBruteForce = (root: TreeNode | null): number => {
	const nodes = nodesOf(root);
	const parent = new Map<TreeNode, TreeNode>();
	for (const node of nodes) {
		if (node.left) parent.set(node.left, node);
		if (node.right) parent.set(node.right, node);
	}
	let best = 0;
	for (let mask = 0; mask < 1 << nodes.length; mask++) {
		const taken = new Set(nodes.filter((_, i) => mask & (1 << i)));
		if ([...taken].some((node) => taken.has(parent.get(node) as TreeNode)))
			continue;
		best = Math.max(
			best,
			[...taken].reduce((sum, node) => sum + node.val, 0),
		);
	}
	return best;
};

describe("337. House Robber III", () => {
	it("solves the examples from the problem statement", () => {
		expect(houseRobberIII(treeFromArray([3, 2, 3, null, 3, null, 1]))).toBe(7);
		expect(houseRobberIII(treeFromArray([3, 4, 5, 1, 3, null, 1]))).toBe(9);
	});

	it("handles a tree too deep for recursion", () => {
		let root: TreeNode | null = null;
		for (let i = 0; i < 10_000; i++) root = new TreeNode(1, root);
		expect(houseRobberIII(root)).toBe(5_000);
	});

	it("matches trying every set of houses on random trees", () => {
		const random = createRandom(337);
		for (let run = 0; run < 300; run++) {
			const root = randomTree(random, 10, 0, 10);
			expect(houseRobberIII(root)).toBe(byBruteForce(root));
		}
	});
});
