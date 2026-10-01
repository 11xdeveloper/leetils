import { describe, expect, it } from "bun:test";
import { type TreeNode, treeFromArray } from "../../structures/tree-node";
import { createRandom } from "../../testing/random";
import { nodesOf, randomTree } from "../../testing/trees";
import { binaryTreeCameras as minCameraCover } from ".";

/** Tries every set of camera positions. */
const byBruteForce = (root: TreeNode | null): number => {
	const nodes = nodesOf(root);
	const parent = new Map<TreeNode, TreeNode>();
	for (const node of nodes)
		for (const child of [node.left, node.right])
			if (child) parent.set(child, node);
	let best = nodes.length;
	for (let mask = 0; mask < 1 << nodes.length; mask++) {
		const cameras = new Set(nodes.filter((_, i) => mask & (1 << i)));
		if (cameras.size >= best) continue;
		const watched = nodes.every((node) =>
			[node, node.left, node.right, parent.get(node)].some(
				(n) => n && cameras.has(n),
			),
		);
		if (watched) best = cameras.size;
	}
	return best;
};

describe("968. Binary Tree Cameras", () => {
	it("solves the examples from the problem statement", () => {
		expect(minCameraCover(treeFromArray([0, 0, null, 0, 0]))).toBe(1);
		expect(
			minCameraCover(treeFromArray([0, 0, null, 0, null, 0, null, null, 0])),
		).toBe(2);
		expect(minCameraCover(treeFromArray([0]))).toBe(1);
	});

	it("matches trying every placement on random trees", () => {
		const random = createRandom(968);
		for (let run = 0; run < 200; run++) {
			const root = randomTree(random, 12, 0, 0);
			if (root) expect(minCameraCover(root)).toBe(byBruteForce(root));
		}
	});
});
