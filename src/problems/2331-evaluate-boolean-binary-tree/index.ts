import type { TreeNode } from "../../structures/tree-node";

/**
 * 2331. Evaluate Boolean Binary Tree
 *
 * Leaves are 0 (false) or 1 (true); internal nodes are 2 (OR) or 3 (AND).
 * Returns the tree's value.
 *
 * Evaluate in post-order (explicit stack).
 *
 * @see https://leetcode.com/problems/evaluate-boolean-binary-tree/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * evaluateBooleanBinaryTree(treeFromArray([2, 1, 3, null, null, 0, 1])); // true
 */
export const evaluateBooleanBinaryTree = (root: TreeNode | null): boolean => {
	const values = new Map<TreeNode, boolean>();
	const stack: [TreeNode, boolean][] = root ? [[root, false]] : [];
	for (let entry = stack.pop(); entry; entry = stack.pop()) {
		const [node, visited] = entry;
		if (!node.left || !node.right) {
			values.set(node, node.val === 1);
			continue;
		}
		if (!visited) {
			stack.push([node, true], [node.left, false], [node.right, false]);
			continue;
		}
		const [left, right] = [values.get(node.left), values.get(node.right)];
		values.set(node, node.val === 2 ? !!(left || right) : !!(left && right));
	}
	return root ? (values.get(root) ?? false) : false;
};
