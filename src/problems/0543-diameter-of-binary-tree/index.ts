import type { TreeNode } from "../../structures/tree-node";

/**
 * 543. Diameter of Binary Tree
 *
 * Returns the length, in edges, of the longest path between any two nodes
 * of a binary tree. The path doesn't have to pass through the root.
 *
 * The longest path through a node joins the deepest paths down its left
 * and right subtrees. A postorder traversal computes each node's height
 * from its children's, using an explicit stack so deep trees don't overflow
 * the call stack.
 *
 * @see https://leetcode.com/problems/diameter-of-binary-tree/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * diameterOfBinaryTree(treeFromArray([1, 2, 3, 4, 5])); // 3: 4 → 2 → 1 → 3
 */
export const diameterOfBinaryTree = (root: TreeNode | null): number => {
	const heights = new Map<TreeNode | null, number>([[null, 0]]);
	let diameter = 0;
	const stack: [TreeNode, boolean][] = root ? [[root, false]] : [];

	for (let entry = stack.pop(); entry; entry = stack.pop()) {
		const [node, childrenDone] = entry;
		if (!childrenDone) {
			stack.push([node, true]);
			if (node.left) stack.push([node.left, false]);
			if (node.right) stack.push([node.right, false]);
			continue;
		}
		const left = heights.get(node.left) ?? 0;
		const right = heights.get(node.right) ?? 0;
		diameter = Math.max(diameter, left + right);
		heights.set(node, 1 + Math.max(left, right));
	}

	return diameter;
};
