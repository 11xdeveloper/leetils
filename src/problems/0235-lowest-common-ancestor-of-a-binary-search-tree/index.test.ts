import { describe, expect, it } from "bun:test";
import { type TreeNode, treeFromArray } from "../../structures/tree-node";
import { createRandom } from "../../testing/random";
import { bstFromValues, nodesOf } from "../../testing/trees";
import { lowestCommonAncestorOfABinarySearchTree as lca } from ".";

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

describe("235. Lowest Common Ancestor of a Binary Search Tree", () => {
	const root = treeFromArray([6, 2, 8, 0, 4, 7, 9, null, null, 3, 5]);

	it("solves the examples from the problem statement", () => {
		expect(lca(root, find(root, 2), find(root, 8))?.val).toBe(6);
		expect(lca(root, find(root, 2), find(root, 4))?.val).toBe(2);
		const small = treeFromArray([2, 1]);
		expect(lca(small, find(small, 2), find(small, 1))?.val).toBe(2);
	});

	it("matches the deepest common ancestor on random binary search trees", () => {
		const random = createRandom(235);
		for (let run = 0; run < 200; run++) {
			const tree = bstFromValues(random.array(random.int(2, 20), 0, 50));
			const nodes = nodesOf(tree);
			for (let pair = 0; pair < 10; pair++) {
				const p = nodes[random.int(0, nodes.length - 1)];
				const q = nodes[random.int(0, nodes.length - 1)];
				if (!p || !q || p === q) continue;
				expect(lca(tree, p, q)).toBe(byBruteForce(tree, p, q) ?? null);
			}
		}
	});
});
