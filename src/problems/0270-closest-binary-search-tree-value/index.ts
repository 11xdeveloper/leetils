import type { TreeNode } from "../../structures/tree-node";

/**
 * 270. Closest Binary Search Tree Value
 *
 * Returns the value in a binary search tree closest to `target`, or the
 * smaller of two equally close values.
 *
 * Walks down from the root towards the target, as a search would, keeping
 * the closest value seen. The closest value is always on that path.
 *
 * @see https://leetcode.com/problems/closest-binary-search-tree-value/
 * @difficulty Easy
 * @timeComplexity O(h) where h is the height of the tree
 * @spaceComplexity O(1)
 *
 * @example
 * closestBinarySearchTreeValue(treeFromArray([4, 2, 5, 1, 3]), 3.714286); // 4
 */
export const closestBinarySearchTreeValue = (
	root: TreeNode | null,
	target: number,
): number => {
	let closest = root?.val ?? 0;

	for (
		let node = root;
		node;
		node = target < node.val ? node.left : node.right
	) {
		const distance = Math.abs(node.val - target);
		const best = Math.abs(closest - target);
		if (distance < best || (distance === best && node.val < closest))
			closest = node.val;
	}

	return closest;
};
