import { describe, expect, it } from "bun:test";
import { type TreeNode, treeFromArray } from "../../structures/tree-node";
import { createRandom } from "../../testing/random";
import { randomTree } from "../../testing/trees";
import { pseudoPalindromicPathsInABinaryTree as pseudoPalindromicPaths } from ".";

/** Lists every root-to-leaf path and counts odd digits. */
const byBruteForce = (root: TreeNode | null): number => {
	const paths = (node: TreeNode | null): number[][] => {
		if (!node) return [];
		if (!node.left && !node.right) return [[node.val]];
		return [...paths(node.left), ...paths(node.right)].map((path) => [
			node.val,
			...path,
		]);
	};
	return paths(root).filter((path) => {
		const odd = [...new Set(path)].filter(
			(d) => path.filter((x) => x === d).length % 2 === 1,
		);
		return odd.length <= 1;
	}).length;
};

describe("1457. Pseudo-Palindromic Paths in a Binary Tree", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			pseudoPalindromicPaths(treeFromArray([2, 3, 1, 3, 1, null, 1])),
		).toBe(2);
		expect(
			pseudoPalindromicPaths(
				treeFromArray([2, 1, 1, 1, 3, null, null, null, null, null, 1]),
			),
		).toBe(1);
		expect(pseudoPalindromicPaths(treeFromArray([9]))).toBe(1);
	});

	it("matches listing every path on random trees", () => {
		const random = createRandom(1457);
		for (let run = 0; run < 300; run++) {
			const root = randomTree(random, 20, 1, 3);
			expect(pseudoPalindromicPaths(root)).toBe(byBruteForce(root));
		}
	});
});
