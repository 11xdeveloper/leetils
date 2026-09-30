import { describe, expect, it } from "bun:test";
import {
	type TreeNode,
	treeFromArray,
	treeToArray,
} from "../../structures/tree-node";
import { createRandom } from "../../testing/random";
import { nodesOf, randomTree } from "../../testing/trees";
import { lowestCommonAncestorOfDeepestLeaves as lcaDeepestLeaves } from ".";

/** The deepest node whose subtree holds every deepest leaf. */
const byBruteForce = (root: TreeNode): TreeNode | undefined => {
	const depthBelow = (node: TreeNode | null): number =>
		node ? 1 + Math.max(depthBelow(node.left), depthBelow(node.right)) : 0;
	const depthOf = new Map<TreeNode, number>();
	const visit = (node: TreeNode | null, depth: number): void => {
		if (!node) return;
		depthOf.set(node, depth);
		visit(node.left, depth + 1);
		visit(node.right, depth + 1);
	};
	visit(root, 0);
	const deepest = depthBelow(root) - 1;
	const leaves = nodesOf(root).filter((node) => depthOf.get(node) === deepest);
	return nodesOf(root)
		.filter((node) => leaves.every((leaf) => nodesOf(node).includes(leaf)))
		.sort((a, b) => (depthOf.get(b) ?? 0) - (depthOf.get(a) ?? 0))[0];
};

describe("1123. Lowest Common Ancestor of Deepest Leaves", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			treeToArray(
				lcaDeepestLeaves(
					treeFromArray([3, 5, 1, 6, 2, 0, 8, null, null, 7, 4]),
				),
			),
		).toEqual([2, 7, 4]);
		expect(treeToArray(lcaDeepestLeaves(treeFromArray([1])))).toEqual([1]);
		expect(
			treeToArray(lcaDeepestLeaves(treeFromArray([0, 1, 3, null, 2]))),
		).toEqual([2]);
	});

	it("matches checking every node on random trees", () => {
		const random = createRandom(1123);
		for (let run = 0; run < 300; run++) {
			const root = randomTree(random, 20, 0, 1000) ?? treeFromArray([1]);
			if (!root) continue;
			expect(lcaDeepestLeaves(root)).toBe(byBruteForce(root) ?? null);
		}
	});
});
