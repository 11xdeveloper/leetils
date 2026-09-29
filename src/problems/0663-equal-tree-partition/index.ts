import type { TreeNode } from "../../structures/tree-node";

/**
 * 663. Equal Tree Partition
 *
 * Returns whether removing exactly one edge of a binary tree can split it
 * into two trees with equal sums.
 *
 * Removing the edge above a node splits off that node's subtree, so it
 * needs a subtree, other than the whole tree, summing to half the total.
 * Subtree sums come from a postorder traversal with an explicit stack.
 *
 * @see https://leetcode.com/problems/equal-tree-partition/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * equalTreePartition(treeFromArray([5, 10, 10, null, null, 2, 3])); // true
 */
export const equalTreePartition = (root: TreeNode | null): boolean => {
	const sums = new Map<TreeNode | null, number>([[null, 0]]);
	const stack: [TreeNode, boolean][] = root ? [[root, false]] : [];
	for (let entry = stack.pop(); entry; entry = stack.pop()) {
		const [node, childrenDone] = entry;
		if (!childrenDone) {
			stack.push([node, true]);
			if (node.left) stack.push([node.left, false]);
			if (node.right) stack.push([node.right, false]);
			continue;
		}
		sums.set(
			node,
			node.val + (sums.get(node.left) ?? 0) + (sums.get(node.right) ?? 0),
		);
	}

	const total = sums.get(root) ?? 0;
	if (total % 2 !== 0) return false;
	for (const [node, sum] of sums) {
		if (node && node !== root && sum === total / 2) return true;
	}
	return false;
};
