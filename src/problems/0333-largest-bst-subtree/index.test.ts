import { describe, expect, it } from "bun:test";
import { TreeNode, treeFromArray } from "../../structures/tree-node";
import { createRandom } from "../../testing/random";
import { nodesOf, randomTree } from "../../testing/trees";
import { validateBinarySearchTree } from "../0098-validate-binary-search-tree";
import { largestBstSubtree } from ".";

const byBruteForce = (root: TreeNode | null): number =>
	Math.max(
		0,
		...nodesOf(root)
			.filter(validateBinarySearchTree)
			.map((node) => nodesOf(node).length),
	);

describe("333. Largest BST Subtree", () => {
	it("solves the examples from the problem statement", () => {
		expect(largestBstSubtree(treeFromArray([10, 5, 15, 1, 8, null, 7]))).toBe(
			3,
		);
		expect(
			largestBstSubtree(
				treeFromArray([
					4,
					2,
					7,
					2,
					3,
					5,
					null,
					2,
					null,
					null,
					null,
					null,
					null,
					1,
				]),
			),
		).toBe(2);
		expect(largestBstSubtree(null)).toBe(0);
	});

	it("handles a tree too deep for recursion", () => {
		let root: TreeNode | null = null;
		for (let i = 0; i < 10_000; i++) root = new TreeNode(i, root);
		expect(largestBstSubtree(root)).toBe(10_000);
	});

	it("matches checking every subtree with Validate Binary Search Tree on random trees", () => {
		const random = createRandom(333);
		for (let run = 0; run < 500; run++) {
			const root = randomTree(random, 15, 0, 10);
			expect(largestBstSubtree(root)).toBe(byBruteForce(root));
		}
	});
});
