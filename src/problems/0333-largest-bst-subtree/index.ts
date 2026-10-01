import type { TreeNode } from "../../structures/tree-node";

interface Summary {
	isBst: boolean;
	size: number;
	min: number;
	max: number;
}

/**
 * 333. Largest BST Subtree
 *
 * Returns the number of nodes in the largest subtree of a binary tree that
 * is a binary search tree. A subtree includes all of a node's descendants.
 *
 * Visits children before parents (postorder) with an explicit stack,
 * summarising each subtree: whether it's a BST, its size and its smallest
 * and largest values. A node's subtree is a BST when both children's are and
 * the node's value lies strictly between the left's largest and the right's
 * smallest, so each node is checked in O(1).
 *
 * @see https://leetcode.com/problems/largest-bst-subtree/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * largestBstSubtree(treeFromArray([10, 5, 15, 1, 8, null, 7])); // 3
 */
export const largestBstSubtree = (root: TreeNode | null): number => {
	const order: TreeNode[] = [];
	const stack = root ? [root] : [];
	for (let node = stack.pop(); node; node = stack.pop()) {
		order.push(node);
		if (node.left) stack.push(node.left);
		if (node.right) stack.push(node.right);
	}

	const empty: Summary = {
		isBst: true,
		size: 0,
		min: Number.POSITIVE_INFINITY,
		max: Number.NEGATIVE_INFINITY,
	};
	const summaries = new Map<TreeNode, Summary>();
	let largest = 0;

	for (const node of order.reverse()) {
		const left = node.left ? (summaries.get(node.left) ?? empty) : empty;
		const right = node.right ? (summaries.get(node.right) ?? empty) : empty;
		const isBst =
			left.isBst && right.isBst && left.max < node.val && node.val < right.min;
		const size = left.size + right.size + 1;
		summaries.set(node, {
			isBst,
			size,
			min: Math.min(left.min, node.val),
			max: Math.max(right.max, node.val),
		});
		if (isBst) largest = Math.max(largest, size);
	}

	return largest;
};
