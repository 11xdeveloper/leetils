import type { TreeNode } from "../../structures/tree-node";

/**
 * 1676. Lowest Common Ancestor of a Binary Tree IV
 *
 * Returns the lowest common ancestor of all the (distinct, present)
 * `nodes` in the tree.
 *
 * A post-order traversal (explicit stack) counts the targets in each
 * subtree; the first node whose subtree holds all of them is the lowest.
 *
 * @see https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree-iv/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * lowestCommonAncestorOfABinaryTreeIV(root, [nodeWithValue4, nodeWithValue7]).val; // 2
 */
export const lowestCommonAncestorOfABinaryTreeIV = (
	root: TreeNode | null,
	nodes: readonly TreeNode[],
): TreeNode | null => {
	const targets = new Set(nodes);
	const counts = new Map<TreeNode, number>();
	const stack: [node: TreeNode, visited: boolean][] = root
		? [[root, false]]
		: [];
	for (let entry = stack.pop(); entry; entry = stack.pop()) {
		const [node, visited] = entry;
		if (!visited) {
			stack.push([node, true]);
			if (node.right) stack.push([node.right, false]);
			if (node.left) stack.push([node.left, false]);
			continue;
		}
		const count =
			(targets.has(node) ? 1 : 0) +
			(node.left ? (counts.get(node.left) ?? 0) : 0) +
			(node.right ? (counts.get(node.right) ?? 0) : 0);
		if (count === targets.size) return node;
		counts.set(node, count);
	}
	return null;
};
