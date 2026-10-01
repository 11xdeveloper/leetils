import type { TreeNode } from "../../structures/tree-node";

/**
 * 272. Closest Binary Search Tree Value II
 *
 * Returns the `k` values in a binary search tree closest to `target`, in any
 * order. The answer is unique.
 *
 * Walks two iterators outwards from the target: one over values below it in
 * descending order, one over values from it upwards in ascending order.
 * Each is a stack of the path to its next value, like the Binary Search Tree
 * Iterator. Taking the closer of the two next values `k` times gives the
 * answer, which beats O(n) on a balanced tree, as the follow-up asks.
 *
 * @see https://leetcode.com/problems/closest-binary-search-tree-value-ii/
 * @difficulty Hard
 * @timeComplexity O(h + k) where h is the height of the tree
 * @spaceComplexity O(h)
 *
 * @example
 * closestBinarySearchTreeValueII(treeFromArray([4, 2, 5, 1, 3]), 3.714286, 2); // [4, 3]
 */
export const closestBinarySearchTreeValueII = (
	root: TreeNode | null,
	target: number,
	k: number,
): number[] => {
	// Stacks of the nodes on the paths to the next smaller and next larger values.
	const smaller: TreeNode[] = [];
	const larger: TreeNode[] = [];
	for (let node = root; node; ) {
		if (node.val < target) {
			smaller.push(node);
			node = node.right;
		} else {
			larger.push(node);
			node = node.left;
		}
	}

	const nextSmaller = (): number => {
		const node = smaller.pop();
		if (!node) return Number.NEGATIVE_INFINITY;
		for (let child = node.left; child; child = child.right) smaller.push(child);
		return node.val;
	};
	const nextLarger = (): number => {
		const node = larger.pop();
		if (!node) return Number.POSITIVE_INFINITY;
		for (let child = node.right; child; child = child.left) larger.push(child);
		return node.val;
	};

	const values: number[] = [];
	let below = nextSmaller();
	let above = nextLarger();
	while (values.length < k) {
		if (target - below <= above - target) {
			values.push(below);
			below = nextSmaller();
		} else {
			values.push(above);
			above = nextLarger();
		}
	}

	return values;
};
