import type { TreeNode } from "../../structures/tree-node";

/**
 * 508. Most Frequent Subtree Sum
 *
 * A subtree sum is the sum of all the values in a node's subtree. Returns
 * the subtree sums that occur most often, in any order (here, in the order
 * their subtrees finish in a postorder traversal).
 *
 * Computes every subtree sum in postorder with an explicit stack, so deep
 * trees don't overflow the call stack, counting how often each occurs.
 *
 * @see https://leetcode.com/problems/most-frequent-subtree-sum/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * mostFrequentSubtreeSum(treeFromArray([5, 2, -3])); // [2, -3, 4]
 */
export const mostFrequentSubtreeSum = (root: TreeNode | null): number[] => {
	const sums = new Map<TreeNode, number>();
	const counts = new Map<number, number>();
	const stack: [TreeNode, boolean][] = root ? [[root, false]] : [];

	for (let entry = stack.pop(); entry; entry = stack.pop()) {
		const [node, childrenDone] = entry;
		if (!childrenDone) {
			stack.push([node, true]);
			if (node.right) stack.push([node.right, false]);
			if (node.left) stack.push([node.left, false]);
			continue;
		}
		const sum =
			node.val +
			(node.left ? (sums.get(node.left) ?? 0) : 0) +
			(node.right ? (sums.get(node.right) ?? 0) : 0);
		sums.set(node, sum);
		counts.set(sum, (counts.get(sum) ?? 0) + 1);
	}

	const most = Math.max(0, ...counts.values());
	return [...counts].filter(([, count]) => count === most).map(([sum]) => sum);
};
