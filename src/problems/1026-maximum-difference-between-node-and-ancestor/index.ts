import type { TreeNode } from "../../structures/tree-node";

/**
 * 1026. Maximum Difference Between Node and Ancestor
 *
 * Returns the largest `|a.val - b.val|` where `a` is an ancestor of `b` in
 * the binary tree.
 *
 * Carries the smallest and largest values on the path from the root down
 * to each node; the difference at each node is against those.
 *
 * @see https://leetcode.com/problems/maximum-difference-between-node-and-ancestor/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * maximumDifferenceBetweenNodeAndAncestor(treeFromArray([8, 3, 10, 1, 6, null, 14, null, null, 4, 7, 13])); // 7
 */
export const maximumDifferenceBetweenNodeAndAncestor = (
	root: TreeNode | null,
): number => {
	let best = 0;
	const stack: [TreeNode, number, number][] = root
		? [[root, root.val, root.val]]
		: [];
	for (let item = stack.pop(); item; item = stack.pop()) {
		const [node, low, high] = item;
		const [min, max] = [Math.min(low, node.val), Math.max(high, node.val)];
		best = Math.max(best, max - min);
		if (node.left) stack.push([node.left, min, max]);
		if (node.right) stack.push([node.right, min, max]);
	}
	return best;
};
