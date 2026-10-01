import { describe, expect, it } from "bun:test";
import { type TreeNode, treeFromArray } from "../../structures/tree-node";
import { createRandom } from "../../testing/random";
import { randomTree } from "../../testing/trees";
import { binaryTreePaths } from ".";

const byRecursion = (node: TreeNode | null): string[] => {
	if (!node) return [];
	if (!node.left && !node.right) return [String(node.val)];
	return [...byRecursion(node.left), ...byRecursion(node.right)].map(
		(path) => `${node.val}->${path}`,
	);
};

describe("257. Binary Tree Paths", () => {
	it("solves the examples from the problem statement", () => {
		expect(binaryTreePaths(treeFromArray([1, 2, 3, null, 5]))).toEqual([
			"1->2->5",
			"1->3",
		]);
		expect(binaryTreePaths(treeFromArray([1]))).toEqual(["1"]);
	});

	it("writes negative values with their sign", () => {
		expect(binaryTreePaths(treeFromArray([-1, -2]))).toEqual(["-1->-2"]);
	});

	it("matches a recursive search on random trees", () => {
		const random = createRandom(257);
		for (let run = 0; run < 500; run++) {
			const root = randomTree(random, 20, -100, 100);
			expect(binaryTreePaths(root)).toEqual(byRecursion(root));
		}
	});
});
