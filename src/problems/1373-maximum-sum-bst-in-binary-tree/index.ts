import type { TreeNode } from "../../structures/tree-node";

/**
 * 1373. Maximum Sum BST in Binary Tree
 *
 * Returns the largest sum of keys of any subtree that is a binary search
 * tree (keys strictly ordered), or 0 if every such sum is negative.
 *
 * Bottom-up, each subtree reports whether it's a BST along with its
 * smallest key, largest key and sum. A node forms a BST when both children
 * do and its key lies strictly between the left's largest and the right's
 * smallest. Reverse preorder visits children first.
 *
 * @see https://leetcode.com/problems/maximum-sum-bst-in-binary-tree/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * maximumSumBstInBinaryTree(treeFromArray([1, 4, 3, 2, 4, 2, 5, null, null, null, null, null, null, 4, 6])); // 20
 */
export const maximumSumBstInBinaryTree = (root: TreeNode | null): number => {
	const order: TreeNode[] = [];
	const stack = root ? [root] : [];
	for (let node = stack.pop(); node; node = stack.pop()) {
		order.push(node);
		if (node.left) stack.push(node.left);
		if (node.right) stack.push(node.right);
	}
	// A subtree's [smallest, largest, sum], or undefined if it isn't a BST.
	const info = new Map<TreeNode, [number, number, number] | undefined>();
	const empty: [number, number, number] = [Infinity, -Infinity, 0];
	let best = 0;
	for (const node of order.reverse()) {
		const left = node.left ? info.get(node.left) : empty;
		const right = node.right ? info.get(node.right) : empty;
		if (!left || !right || left[1] >= node.val || right[0] <= node.val) {
			info.set(node, undefined);
			continue;
		}
		const sum = left[2] + right[2] + node.val;
		info.set(node, [
			Math.min(left[0], node.val),
			Math.max(right[1], node.val),
			sum,
		]);
		best = Math.max(best, sum);
	}
	return best;
};
