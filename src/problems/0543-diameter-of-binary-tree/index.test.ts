import { describe, expect, it } from "bun:test";
import { TreeNode, treeFromArray } from "../../structures/tree-node";
import { createRandom } from "../../testing/random";
import { nodesOf, randomTree } from "../../testing/trees";
import { diameterOfBinaryTree } from ".";

/** Breadth-first search from every node over the tree as an undirected graph. */
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
	let best = 0;
	for (const start of nodes) {
		const distance = new Map([[start, 0]]);
		const queue = [start];
		for (const node of queue) {
			for (const next of neighbours.get(node) ?? []) {
				if (distance.has(next)) continue;
				distance.set(next, (distance.get(node) ?? 0) + 1);
				best = Math.max(best, distance.get(next) ?? 0);
				queue.push(next);
			}
		}
	}
	return best;
};

describe("543. Diameter of Binary Tree", () => {
	it("solves the examples from the problem statement", () => {
		expect(diameterOfBinaryTree(treeFromArray([1, 2, 3, 4, 5]))).toBe(3);
		expect(diameterOfBinaryTree(treeFromArray([1, 2]))).toBe(1);
	});

	it("matches searching from every node on random trees", () => {
		const random = createRandom(543);
		for (let run = 0; run < 300; run++) {
			const root = randomTree(random, 20, 0, 9);
			expect(diameterOfBinaryTree(root)).toBe(byBruteForce(root));
		}
	});

	it("handles a very deep tree", () => {
		let root = new TreeNode(0);
		for (let i = 1; i < 10_000; i++) root = new TreeNode(i, root);
		expect(diameterOfBinaryTree(root)).toBe(9999);
	});
});
