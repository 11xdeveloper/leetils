import { describe, expect, it } from "bun:test";
import { type TreeNode, treeFromArray } from "../../structures/tree-node";
import { createRandom } from "../../testing/random";
import { nodesOf, randomTree } from "../../testing/trees";
import { allNodesDistanceKInBinaryTree as distanceK } from ".";

/** Distance between two nodes via the paths from the root. */
const distance = (root: TreeNode | null, a: TreeNode, b: TreeNode): number => {
	const pathTo = (
		node: TreeNode | null,
		goal: TreeNode,
	): TreeNode[] | undefined => {
		if (!node) return undefined;
		if (node === goal) return [node];
		const below = pathTo(node.left, goal) ?? pathTo(node.right, goal);
		return below ? [node, ...below] : undefined;
	};
	const [pa = [], pb = []] = [pathTo(root, a), pathTo(root, b)];
	let shared = 0;
	while (pa[shared] && pa[shared] === pb[shared]) shared++;
	return pa.length + pb.length - 2 * shared;
};

describe("863. All Nodes Distance K in Binary Tree", () => {
	it("solves the examples from the problem statement", () => {
		const root = treeFromArray([3, 5, 1, 6, 2, 0, 8, null, null, 7, 4]);
		expect(distanceK(root, root?.left ?? null, 2).sort()).toEqual([1, 4, 7]);
		const single = treeFromArray([1]);
		expect(distanceK(single, single, 3)).toEqual([]);
	});

	it("matches measuring every node's distance on random trees", () => {
		const random = createRandom(863);
		for (let run = 0; run < 300; run++) {
			const root = randomTree(random, 15, 0, 0);
			const nodes = nodesOf(root);
			if (nodes.length === 0) continue;
			for (const [i, node] of nodes.entries()) node.val = i;
			const target = nodes[random.int(0, nodes.length - 1)];
			if (!target) continue;
			const k = random.int(0, 5);
			const expected = nodes
				.filter((node) => distance(root, target, node) === k)
				.map((node) => node.val);
			expect(distanceK(root, target, k).sort((a, b) => a - b)).toEqual(
				expected.sort((a, b) => a - b),
			);
		}
	});
});
