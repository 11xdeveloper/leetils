import { describe, expect, it } from "bun:test";
import type { TreeNode } from "../../structures/tree-node";
import { inorderValues, nodesOf } from "../../testing/trees";
import { convertSortedArrayToBinarySearchTree } from ".";

const height = (node: TreeNode | null): number =>
	node ? 1 + Math.max(height(node.left), height(node.right)) : 0;

const isBalanced = (root: TreeNode | null): boolean =>
	nodesOf(root).every(
		(node) => Math.abs(height(node.left) - height(node.right)) <= 1,
	);

describe("108. Convert Sorted Array to Binary Search Tree", () => {
	it("solves the examples from the problem statement", () => {
		const root = convertSortedArrayToBinarySearchTree([-10, -3, 0, 5, 9]);
		expect(inorderValues(root)).toEqual([-10, -3, 0, 5, 9]);
		expect(isBalanced(root)).toBeTrue();
		expect(inorderValues(convertSortedArrayToBinarySearchTree([1, 3]))).toEqual(
			[1, 3],
		);
	});

	it("builds balanced binary search trees for every length up to 100", () => {
		for (let n = 1; n <= 100; n++) {
			const nums = Array.from({ length: n }, (_, i) => i * 3 - 40);
			const root = convertSortedArrayToBinarySearchTree(nums);
			expect(inorderValues(root)).toEqual(nums);
			expect(isBalanced(root)).toBeTrue();
		}
	});
});
