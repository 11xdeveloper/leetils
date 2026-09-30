import type { TreeNode } from "../../structures/tree-node";

/**
 * 1325. Delete Leaves With a Given Value
 *
 * Repeatedly deletes leaves with value `target`, including parents that
 * become such leaves, in place, and returns the root (or `null`).
 *
 * In postorder a node's children are settled before it, so a single pass
 * works: cut deleted children, then delete the node if it's now a leaf
 * with the target value. An explicit stack handles deep trees.
 *
 * @see https://leetcode.com/problems/delete-leaves-with-a-given-value/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * treeToArray(deleteLeavesWithAGivenValue(treeFromArray([1, 2, 3, 2, null, 2, 4]), 2)); // [1, null, 3, null, 4]
 */
export const deleteLeavesWithAGivenValue = (
	root: TreeNode | null,
	target: number,
): TreeNode | null => {
	const deleted = new Set<TreeNode>();
	const stack: [TreeNode, boolean][] = root ? [[root, false]] : [];
	for (let item = stack.pop(); item; item = stack.pop()) {
		const [node, childrenDone] = item;
		if (!childrenDone) {
			stack.push([node, true]);
			if (node.left) stack.push([node.left, false]);
			if (node.right) stack.push([node.right, false]);
			continue;
		}
		if (node.left && deleted.has(node.left)) node.left = null;
		if (node.right && deleted.has(node.right)) node.right = null;
		if (!node.left && !node.right && node.val === target) deleted.add(node);
	}
	return root && deleted.has(root) ? null : root;
};
