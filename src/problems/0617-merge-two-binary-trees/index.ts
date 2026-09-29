import { TreeNode } from "../../structures/tree-node";

/**
 * 617. Merge Two Binary Trees
 *
 * Overlays two binary trees: where both have a node, the merged node holds
 * the sum of their values; where only one does, that node is used. Returns
 * a new tree, leaving both inputs unchanged.
 *
 * Builds the merged tree top-down with an explicit stack of positions to
 * fill, so deep trees don't overflow the call stack.
 *
 * @see https://leetcode.com/problems/merge-two-binary-trees/
 * @difficulty Easy
 * @timeComplexity O(m + n)
 * @spaceComplexity O(m + n) for the new tree
 *
 * @example
 * treeToArray(mergeTwoBinaryTrees(treeFromArray([1, 3, 2, 5]), treeFromArray([2, 1, 3, null, 4, null, 7]))); // [3, 4, 5, 5, 4, null, 7]
 */
export const mergeTwoBinaryTrees = (
	root1: TreeNode | null,
	root2: TreeNode | null,
): TreeNode | null => {
	const merge = (a: TreeNode | null, b: TreeNode | null): TreeNode | null =>
		a || b ? new TreeNode((a?.val ?? 0) + (b?.val ?? 0)) : null;

	const root = merge(root1, root2);
	const stack: [TreeNode, TreeNode | null, TreeNode | null][] = root
		? [[root, root1, root2]]
		: [];
	for (let entry = stack.pop(); entry; entry = stack.pop()) {
		const [node, a, b] = entry;
		node.left = merge(a?.left ?? null, b?.left ?? null);
		node.right = merge(a?.right ?? null, b?.right ?? null);
		if (node.left) stack.push([node.left, a?.left ?? null, b?.left ?? null]);
		if (node.right)
			stack.push([node.right, a?.right ?? null, b?.right ?? null]);
	}

	return root;
};
