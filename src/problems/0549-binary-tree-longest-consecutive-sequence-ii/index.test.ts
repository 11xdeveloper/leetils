import { describe, expect, it } from "bun:test";
import { type TreeNode, treeFromArray } from "../../structures/tree-node";
import { createRandom } from "../../testing/random";
import { nodesOf, randomTree } from "../../testing/trees";
import { binaryTreeLongestConsecutiveSequenceII as longestConsecutive } from ".";

/**
 * Treats the tree as an undirected graph and follows values going up by 1
 * from every node. A decreasing path is an increasing one read backwards.
 */
const byBruteForce = (root: TreeNode | null): number => {
	const nodes = nodesOf(root);
	const neighbours = new Map<TreeNode, TreeNode[]>(
		nodes.map((node) => [node, []]),
	);
	for (const node of nodes) {
		for (const child of [node.left, node.right]) {
			if (!child) continue;
			neighbours.get(node)?.push(child);
			neighbours.get(child)?.push(node);
		}
	}
	const climb = (node: TreeNode): number =>
		1 +
		Math.max(
			0,
			...(neighbours.get(node) ?? [])
				.filter((next) => next.val === node.val + 1)
				.map(climb),
		);
	return Math.max(0, ...nodes.map(climb));
};

describe("549. Binary Tree Longest Consecutive Sequence II", () => {
	it("solves the examples from the problem statement", () => {
		expect(longestConsecutive(treeFromArray([1, 2, 3]))).toBe(2);
		expect(longestConsecutive(treeFromArray([2, 1, 3]))).toBe(3);
	});

	it("matches following values up by 1 from every node on random trees", () => {
		const random = createRandom(549);
		for (let run = 0; run < 500; run++) {
			const root = randomTree(random, 20, 0, 4);
			expect(longestConsecutive(root)).toBe(byBruteForce(root));
		}
	});
});
