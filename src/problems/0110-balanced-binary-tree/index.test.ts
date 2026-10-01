import { describe, expect, it } from "bun:test";
import { type TreeNode, treeFromArray } from "../../structures/tree-node";
import { createRandom } from "../../testing/random";
import { nodesOf, randomTree } from "../../testing/trees";
import { balancedBinaryTree } from ".";

const height = (node: TreeNode | null): number =>
	node ? 1 + Math.max(height(node.left), height(node.right)) : 0;

const byDefinition = (root: TreeNode | null): boolean =>
	nodesOf(root).every(
		(node) => Math.abs(height(node.left) - height(node.right)) <= 1,
	);

describe("110. Balanced Binary Tree", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			balancedBinaryTree(treeFromArray([3, 9, 20, null, null, 15, 7])),
		).toBeTrue();
		expect(
			balancedBinaryTree(treeFromArray([1, 2, 2, 3, 3, null, null, 4, 4])),
		).toBeFalse();
		expect(balancedBinaryTree(null)).toBeTrue();
	});

	it("checks every node, not just the root", () => {
		expect(
			balancedBinaryTree(
				treeFromArray([1, 2, 2, 3, null, null, 3, 4, null, null, 4]),
			),
		).toBeFalse();
	});

	it("matches the definition on random trees", () => {
		const random = createRandom(110);
		for (let run = 0; run < 1000; run++) {
			const root = randomTree(random, 12, 0, 0);
			expect(balancedBinaryTree(root)).toBe(byDefinition(root));
		}
	});
});
