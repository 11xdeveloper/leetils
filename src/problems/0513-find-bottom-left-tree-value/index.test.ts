import { describe, expect, it } from "bun:test";
import { type TreeNode, treeFromArray } from "../../structures/tree-node";
import { createRandom } from "../../testing/random";
import { randomTree } from "../../testing/trees";
import { findBottomLeftTreeValue as findBottomLeftValue } from ".";

/** The first value found at the greatest depth by a left-first preorder traversal. */
const byDepth = (root: TreeNode | null): number => {
	let best: [depth: number, value: number] = [-1, 0];
	const visit = (node: TreeNode | null, depth: number): void => {
		if (!node) return;
		if (depth > best[0]) best = [depth, node.val];
		visit(node.left, depth + 1);
		visit(node.right, depth + 1);
	};
	visit(root, 0);
	return best[1];
};

describe("513. Find Bottom Left Tree Value", () => {
	it("solves the examples from the problem statement", () => {
		expect(findBottomLeftValue(treeFromArray([2, 1, 3]))).toBe(1);
		expect(
			findBottomLeftValue(
				treeFromArray([1, 2, 3, 4, null, 5, 6, null, null, 7]),
			),
		).toBe(7);
	});

	it("matches a depth-first search on random trees", () => {
		const random = createRandom(513);
		for (let run = 0; run < 500; run++) {
			const root = randomTree(random, 20, -9, 9);
			if (root) expect(findBottomLeftValue(root)).toBe(byDepth(root));
		}
	});
});
