import { describe, expect, it } from "bun:test";
import { TreeNode, treeFromArray } from "../../structures/tree-node";
import { createRandom } from "../../testing/random";
import { nodesOf, randomTree } from "../../testing/trees";
import { lowestCommonAncestorOfABinaryTree as lca } from ".";

/** The deepest node whose subtree contains both targets. */
const byBruteForce = (
	root: TreeNode | null,
	p: TreeNode,
	q: TreeNode,
): TreeNode | undefined =>
	nodesOf(root)
		.filter((node) => nodesOf(node).includes(p) && nodesOf(node).includes(q))
		.at(-1);

const find = (root: TreeNode | null, val: number): TreeNode => {
	const node = nodesOf(root).find((n) => n.val === val);
	if (!node) throw new Error(`No node with value ${val}`);
	return node;
};

describe("236. Lowest Common Ancestor of a Binary Tree", () => {
	const root = treeFromArray([3, 5, 1, 6, 2, 0, 8, null, null, 7, 4]);

	it("solves the examples from the problem statement", () => {
		expect(lca(root, find(root, 5), find(root, 1))?.val).toBe(3);
		expect(lca(root, find(root, 5), find(root, 4))?.val).toBe(5);
		const small = treeFromArray([1, 2]);
		expect(lca(small, find(small, 1), find(small, 2))?.val).toBe(1);
	});

	it("handles a tree too deep for recursion", () => {
		const deepest = new TreeNode(0);
		let top = deepest;
		for (let i = 1; i < 100_000; i++) top = new TreeNode(i, top);
		const other = new TreeNode(-1);
		deepest.right = other;
		expect(lca(top, deepest, other)).toBe(deepest);
	});

	it("matches the deepest common ancestor on random trees", () => {
		const random = createRandom(236);
		for (let run = 0; run < 300; run++) {
			const tree = randomTree(random, 20, 0, 9);
			const nodes = nodesOf(tree);
			if (nodes.length < 2) continue;
			for (let pair = 0; pair < 10; pair++) {
				const p = nodes[random.int(0, nodes.length - 1)];
				const q = nodes[random.int(0, nodes.length - 1)];
				if (!p || !q || p === q) continue;
				expect(lca(tree, p, q)).toBe(byBruteForce(tree, p, q) ?? null);
			}
		}
	});
});
