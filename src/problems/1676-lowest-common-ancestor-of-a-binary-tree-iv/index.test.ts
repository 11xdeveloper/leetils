import { describe, expect, it } from "bun:test";
import { type TreeNode, treeFromArray } from "../../structures/tree-node";
import { createRandom } from "../../testing/random";
import { nodesOf, randomTree } from "../../testing/trees";
import { lowestCommonAncestorOfABinaryTreeIV as lowestCommonAncestor } from ".";

const find = (root: TreeNode | null, val: number): TreeNode => {
	const node = nodesOf(root).find((n) => n.val === val);
	if (!node) throw new Error(`No node with value ${val}`);
	return node;
};

describe("1676. Lowest Common Ancestor of a Binary Tree IV", () => {
	const root = treeFromArray([3, 5, 1, 6, 2, 0, 8, null, null, 7, 4]);

	it("solves the examples from the problem statement", () => {
		expect(
			lowestCommonAncestor(root, [find(root, 4), find(root, 7)])?.val,
		).toBe(2);
		expect(lowestCommonAncestor(root, [find(root, 1)])?.val).toBe(1);
		expect(
			lowestCommonAncestor(
				root,
				[7, 6, 2, 4].map((v) => find(root, v)),
			)?.val,
		).toBe(5);
	});

	it("matches checking subtrees on random trees", () => {
		const random = createRandom(1676);
		for (let run = 0; run < 200; run++) {
			const tree = randomTree(random, 12, 0, 9);
			const all = nodesOf(tree);
			if (all.length === 0) continue;
			const chosen = all.filter(() => random.int(0, 2) === 0);
			const targets = chosen.length > 0 ? chosen : all.slice(0, 1);
			const expected = all
				.filter((node) => targets.every((t) => nodesOf(node).includes(t)))
				.at(-1);
			expect(lowestCommonAncestor(tree, targets)).toBe(expected ?? null);
		}
	});
});
