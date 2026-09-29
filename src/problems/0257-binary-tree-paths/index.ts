import type { TreeNode } from "../../structures/tree-node";

/**
 * 257. Binary Tree Paths
 *
 * Returns every path from the root of a binary tree down to a leaf, written
 * as its values joined by `"->"`, from left to right.
 *
 * Depth-first search with an explicit stack of nodes and the paths leading
 * to them. The right child is pushed before the left, so paths come out
 * from left to right.
 *
 * @see https://leetcode.com/problems/binary-tree-paths/
 * @difficulty Easy
 * @timeComplexity O(n * h) where h is the height of the tree
 * @spaceComplexity O(n * h)
 *
 * @example
 * binaryTreePaths(treeFromArray([1, 2, 3, null, 5])); // ["1->2->5", "1->3"]
 */
export const binaryTreePaths = (root: TreeNode | null): string[] => {
	const paths: string[] = [];
	const stack: [TreeNode, string][] = root ? [[root, String(root.val)]] : [];

	for (let entry = stack.pop(); entry; entry = stack.pop()) {
		const [node, path] = entry;
		if (!node.left && !node.right) paths.push(path);
		if (node.right) stack.push([node.right, `${path}->${node.right.val}`]);
		if (node.left) stack.push([node.left, `${path}->${node.left.val}`]);
	}

	return paths;
};
