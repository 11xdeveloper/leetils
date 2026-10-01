import { describe, expect, it } from "bun:test";
import { TreeNode, treeFromArray } from "../../structures/tree-node";
import { createRandom } from "../../testing/random";
import { nodesOf, randomTree } from "../../testing/trees";
import { lowestCommonAncestorOfABinaryTreeII as lca } from ".";

const find = (root: TreeNode | null, val: number): TreeNode => {
	const node = nodesOf(root).find((n) => n.val === val);
	if (!node) throw new Error(`No node with value ${val}`);
	return node;
};

describe("1644. Lowest Common Ancestor of a Binary Tree II", () => {
	const root = treeFromArray([3, 5, 1, 6, 2, 0, 8, null, null, 7, 4]);

	it("solves the examples from the problem statement", () => {
		expect(lca(root, find(root, 5), find(root, 1))?.val).toBe(3);
		expect(lca(root, find(root, 5), find(root, 4))?.val).toBe(5);
		expect(lca(root, find(root, 5), new TreeNode(10))).toBeNull();
	});

	it("matches checking subtrees on random trees, with nodes that may be missing", () => {
		const random = createRandom(1644);
		for (let run = 0; run < 200; run++) {
			const tree = randomTree(random, 10, 0, 9);
			const nodes = nodesOf(tree);
			const pick = () =>
				random.int(0, 4) === 0
					? new TreeNode(-1)
					: (nodes[random.int(0, nodes.length - 1)] ?? new TreeNode(-1));
			const [p, q] = [pick(), pick()];
			const expected =
				nodes
					.filter(
						(node) => nodesOf(node).includes(p) && nodesOf(node).includes(q),
					)
					.at(-1) ?? null;
			expect(lca(tree, p, q)).toBe(expected);
		}
	});
});
