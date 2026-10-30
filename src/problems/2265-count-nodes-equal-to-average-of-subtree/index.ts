import type { TreeNode } from "../../structures/tree-node";

/**
 * 2265. Count Nodes Equal to Average of Subtree
 *
 * Counts the nodes whose value equals the rounded-down average of their
 * subtree's values.
 *
 * A post-order traversal (explicit stack) computes subtree sums and sizes.
 *
 * @see https://leetcode.com/problems/count-nodes-equal-to-average-of-subtree/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * countNodesEqualToAverageOfSubtree(treeFromArray([4, 8, 5, 0, 1, null, 6])); // 5
 */
export const countNodesEqualToAverageOfSubtree = (
	root: TreeNode | null,
): number => {
	const totals = new Map<TreeNode | null, [sum: number, size: number]>([
		[null, [0, 0]],
	]);
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
		const [leftSum, leftSize] = totals.get(node.left) ?? [0, 0];
		const [rightSum, rightSize] = totals.get(node.right) ?? [0, 0];
		const [sum, size] = [
			leftSum + rightSum + node.val,
			leftSize + rightSize + 1,
		];
		if (Math.floor(sum / size) === node.val) count++;
		totals.set(node, [sum, size]);
	}
	return count;
};
