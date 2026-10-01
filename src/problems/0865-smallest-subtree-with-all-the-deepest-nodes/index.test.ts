import { describe, expect, it } from "bun:test";
import {
	type TreeNode,
	treeFromArray,
	treeToArray,
} from "../../structures/tree-node";
import { createRandom } from "../../testing/random";
import { nodesOf, randomTree } from "../../testing/trees";
import { smallestSubtreeWithAllTheDeepestNodes as subtreeWithAllDeepest } from ".";

/** The deepest node whose subtree contains every deepest node. */
const byBruteForce = (root: TreeNode | null): TreeNode | null => {
	const depthOf = new Map<TreeNode, number>();
	const visit = (node: TreeNode | null, depth: number): void => {
		if (!node) return;
		depthOf.set(node, depth);
		visit(node.left, depth + 1);
		visit(node.right, depth + 1);
	};
	visit(root, 0);
	const deepest = Math.max(...depthOf.values());
	const targets = [...depthOf]
		.filter(([, d]) => d === deepest)
		.map(([node]) => node);
	const containsAll = (node: TreeNode) => {
		const inside = new Set(nodesOf(node));
		return targets.every((target) => inside.has(target));
	};
	return nodesOf(root)
		.filter(containsAll)
		.reduce<TreeNode | null>(
			(best, node) =>
				!best || (depthOf.get(node) ?? 0) > (depthOf.get(best) ?? 0)
					? node
					: best,
			null,
		);
};

describe("865. Smallest Subtree with all the Deepest Nodes", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			treeToArray(
				subtreeWithAllDeepest(
					treeFromArray([3, 5, 1, 6, 2, 0, 8, null, null, 7, 4]),
				),
			),
		).toEqual([2, 7, 4]);
		expect(treeToArray(subtreeWithAllDeepest(treeFromArray([1])))).toEqual([1]);
		expect(
			treeToArray(subtreeWithAllDeepest(treeFromArray([0, 1, 3, null, 2]))),
		).toEqual([2]);
	});

	it("matches checking every subtree on random trees", () => {
		const random = createRandom(865);
		for (let run = 0; run < 500; run++) {
			const root = randomTree(random, 20, 0, 9);
			if (root) expect(subtreeWithAllDeepest(root)).toBe(byBruteForce(root));
		}
	});
});
