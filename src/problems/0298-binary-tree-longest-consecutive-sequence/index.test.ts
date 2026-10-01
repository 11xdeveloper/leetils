import { describe, expect, it } from "bun:test";
import { TreeNode, treeFromArray } from "../../structures/tree-node";
import { createRandom } from "../../testing/random";
import { nodesOf, randomTree } from "../../testing/trees";
import { binaryTreeLongestConsecutiveSequence as longest } from ".";

/** From every node, follows every child whose value is one more. */
const byBruteForce = (root: TreeNode | null): number => {
	const from = (node: TreeNode): number =>
		1 +
		Math.max(
			0,
			...[node.left, node.right]
				.filter((c) => c !== null && c.val === node.val + 1)
				.map((c) => from(c as TreeNode)),
		);
	return Math.max(0, ...nodesOf(root).map(from));
};

describe("298. Binary Tree Longest Consecutive Sequence", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			longest(treeFromArray([1, null, 3, 2, 4, null, null, null, 5])),
		).toBe(3);
		expect(longest(treeFromArray([2, null, 3, 2, null, 1]))).toBe(2);
	});

	it("only counts increasing sequences", () => {
		expect(longest(treeFromArray([3, 2, 1]))).toBe(1);
	});

	it("handles a tree too deep for recursion", () => {
		let root: TreeNode | null = null;
		for (let i = 30_000; i >= 1; i--) root = new TreeNode(i, root);
		expect(longest(root)).toBe(30_000);
	});

	it("matches following every run on random trees", () => {
		const random = createRandom(298);
		for (let run = 0; run < 500; run++) {
			const root = randomTree(random, 20, 0, 4) ?? new TreeNode(0);
			expect(longest(root)).toBe(byBruteForce(root));
		}
	});
});
