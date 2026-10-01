import { describe, expect, it } from "bun:test";
import { listFromArray } from "../../structures/list-node";
import type { TreeNode } from "../../structures/tree-node";
import { inorderValues, nodesOf } from "../../testing/trees";
import { convertSortedListToBinarySearchTree } from ".";

const height = (node: TreeNode | null): number =>
	node ? 1 + Math.max(height(node.left), height(node.right)) : 0;

const isBalanced = (root: TreeNode | null): boolean =>
	nodesOf(root).every(
		(node) => Math.abs(height(node.left) - height(node.right)) <= 1,
	);

describe("109. Convert Sorted List to Binary Search Tree", () => {
	it("solves the examples from the problem statement", () => {
		const root = convertSortedListToBinarySearchTree(
			listFromArray([-10, -3, 0, 5, 9]),
		);
		expect(inorderValues(root)).toEqual([-10, -3, 0, 5, 9]);
		expect(isBalanced(root)).toBeTrue();
		expect(convertSortedListToBinarySearchTree(null)).toBeNull();
	});

	it("builds balanced binary search trees for every length up to 100", () => {
		for (let n = 1; n <= 100; n++) {
			const values = Array.from({ length: n }, (_, i) => i * 3 - 40);
			const root = convertSortedListToBinarySearchTree(listFromArray(values));
			expect(inorderValues(root)).toEqual(values);
			expect(isBalanced(root)).toBeTrue();
		}
	});
});
