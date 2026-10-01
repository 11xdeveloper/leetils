import type { TreeNode } from "../../structures/tree-node";

/**
 * 1110. Delete Nodes And Return Forest
 *
 * Deletes the nodes whose values are in `to_delete` from the tree (whose
 * values are distinct), in place, and returns the roots of the trees left
 * behind, in any order.
 *
 * Walks the tree with an explicit stack, noting for each node whether its
 * parent survived. A surviving node whose parent didn't (or the root) starts
 * a tree. Links to deleted children are cut.
 *
 * @see https://leetcode.com/problems/delete-nodes-and-return-forest/
 * @difficulty Medium
 * @timeComplexity O(n + d) for d values to delete
 * @spaceComplexity O(n + d)
 *
 * @example
 * deleteNodesAndReturnForest(treeFromArray([1, 2, 3, 4, 5, 6, 7]), [3, 5]).map(treeToArray);
 * // [[1, 2, null, 4], [6], [7]]
 */
export const deleteNodesAndReturnForest = (
	root: TreeNode | null,
	to_delete: readonly number[],
): TreeNode[] => {
	const deleted = new Set(to_delete);
	const roots: TreeNode[] = [];
	const stack: [TreeNode, boolean][] = root ? [[root, false]] : [];
	for (let item = stack.pop(); item; item = stack.pop()) {
		const [node, parentSurvives] = item;
		const survives = !deleted.has(node.val);
		if (survives && !parentSurvives) roots.push(node);
		if (node.right) {
			stack.push([node.right, survives]);
			if (deleted.has(node.right.val)) node.right = null;
		}
		if (node.left) {
			stack.push([node.left, survives]);
			if (deleted.has(node.left.val)) node.left = null;
		}
	}
	return roots;
};
