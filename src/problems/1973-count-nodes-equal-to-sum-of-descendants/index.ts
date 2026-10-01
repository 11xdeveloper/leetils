import type { TreeNode } from "../../structures/tree-node";

/**
 * 1973. Count Nodes Equal to Sum of Descendants
 *
 * Counts the nodes whose value equals the sum of their descendants'
 * values (0 for a leaf).
 *
 * A post-order traversal (explicit stack) computes subtree sums.
 *
 * @see https://leetcode.com/problems/count-nodes-equal-to-sum-of-descendants/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * countNodesEqualToSumOfDescendants(treeFromArray([10, 3, 4, 2, 1])); // 2
 */
export const countNodesEqualToSumOfDescendants = (
	root: TreeNode | null,
): number => {
	const sums = new Map<TreeNode | null, number>([[null, 0]]);
	let count = 0;
	const stack: [TreeNode, boolean][] = root ? [[root, false]] : [];
	for (let entry = stack.pop(); entry; entry = stack.pop()) {
		const [node, visited] = entry;
		if (!visited) {
			stack.push([node, true]);
			if (node.left) stack.push([node.left, false]);
			if (node.right) stack.push([node.right, false]);
			continue;
		}
		const descendants =
			(sums.get(node.left) ?? 0) + (sums.get(node.right) ?? 0);
		if (descendants === node.val) count++;
		sums.set(node, descendants + node.val);
	}
	return count;
};
