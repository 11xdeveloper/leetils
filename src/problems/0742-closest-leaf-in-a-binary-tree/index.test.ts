import { describe, expect, it } from "bun:test";
import { type TreeNode, treeFromArray } from "../../structures/tree-node";
import { createRandom } from "../../testing/random";
import { nodesOf, randomTree } from "../../testing/trees";
import { closestLeafInABinaryTree as findClosestLeaf } from ".";

/** Distances from the node with value k to every node, via paths through their lowest common ancestor. */
const distancesFrom = (
	root: TreeNode | null,
	k: number,
): Map<number, number> => {
	const pathTo = (
		node: TreeNode | null,
		value: number,
	): TreeNode[] | undefined => {
		if (!node) return undefined;
		if (node.val === value) return [node];
		const below = pathTo(node.left, value) ?? pathTo(node.right, value);
		return below ? [node, ...below] : undefined;
	};
	const toK = pathTo(root, k) ?? [];
	return new Map(
		nodesOf(root).map((node) => {
			const toNode = pathTo(root, node.val) ?? [];
			let shared = 0;
			while (shared < toK.length && toK[shared] === toNode[shared]) shared++;
			return [node.val, toK.length + toNode.length - 2 * shared];
		}),
	);
};

describe("742. Closest Leaf in a Binary Tree", () => {
	it("solves the examples from the problem statement", () => {
		expect([2, 3]).toContain(findClosestLeaf(treeFromArray([1, 3, 2]), 1));
		expect(findClosestLeaf(treeFromArray([1]), 1)).toBe(1);
		expect(
			findClosestLeaf(
				treeFromArray([1, 2, 3, 4, null, null, null, 5, null, 6]),
				2,
			),
		).toBe(3);
	});

	it("returns a leaf at the smallest distance on random trees", () => {
		const random = createRandom(742);
		for (let run = 0; run < 500; run++) {
			const root = randomTree(random, 20, 0, 0);
			const nodes = nodesOf(root);
			for (const [i, node] of nodes.entries()) node.val = i + 1;
			if (nodes.length === 0) continue;
			const k = random.int(1, nodes.length);
			const distances = distancesFrom(root, k);
			const leaves = nodes.filter((node) => !node.left && !node.right);
			const nearest = Math.min(
				...leaves.map((leaf) => distances.get(leaf.val) ?? Infinity),
			);
			const result = findClosestLeaf(root, k);
			expect(leaves.map((leaf) => leaf.val)).toContain(result);
			expect(distances.get(result)).toBe(nearest);
		}
	});
});
