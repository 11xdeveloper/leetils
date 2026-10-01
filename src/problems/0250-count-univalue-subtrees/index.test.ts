import { describe, expect, it } from "bun:test";
import { TreeNode, treeFromArray } from "../../structures/tree-node";
import { createRandom } from "../../testing/random";
import { nodesOf, randomTree } from "../../testing/trees";
import { countUnivalueSubtrees } from ".";

const byDefinition = (root: TreeNode | null): number =>
	nodesOf(root).filter((node) => nodesOf(node).every((n) => n.val === node.val))
		.length;

describe("250. Count Univalue Subtrees", () => {
	it("solves the examples from the problem statement", () => {
		expect(countUnivalueSubtrees(treeFromArray([5, 1, 5, 5, 5, null, 5]))).toBe(
			4,
		);
		expect(countUnivalueSubtrees(null)).toBe(0);
		expect(countUnivalueSubtrees(treeFromArray([5, 5, 5, 5, 5, null, 5]))).toBe(
			6,
		);
	});

	it("handles a tree too deep for recursion", () => {
		let root: TreeNode | null = null;
		for (let i = 0; i < 100_000; i++) root = new TreeNode(7, root);
		expect(countUnivalueSubtrees(root)).toBe(100_000);
	});

	it("matches checking every subtree on random trees", () => {
		const random = createRandom(250);
		for (let run = 0; run < 500; run++) {
			const root = randomTree(random, 15, 0, 1);
			expect(countUnivalueSubtrees(root)).toBe(byDefinition(root));
		}
	});
});
