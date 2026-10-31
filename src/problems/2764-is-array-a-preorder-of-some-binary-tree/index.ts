/**
 * 2764. Is Array a Preorder of Some ‌Binary Tree
 *
 * `nodes[i] = [id, parentId]` describes a binary tree, with the root's
 * parent -1. Returns whether `nodes` lists the tree in some preorder.
 *
 * Keep the current root-to-node path on a stack. Each next node's parent
 * must be on it; pop back to that parent, since the subtrees in between
 * are finished, then push the node.
 *
 * @see https://leetcode.com/problems/is-array-a-preorder-of-some-binary-tree/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * isArrayAPreorderOfSomeBinaryTree([[0, -1], [1, 0], [2, 0], [3, 2], [4, 2]]); // true
 */
export const isArrayAPreorderOfSomeBinaryTree = (
	nodes: readonly (readonly number[])[],
): boolean => {
	const path: number[] = [];
	for (const [id = 0, parent = -1] of nodes) {
		if (parent === -1) {
			if (path.length > 0) return false;
		} else {
			while (path.length > 0 && path.at(-1) !== parent) path.pop();
			if (path.length === 0) return false;
		}
		path.push(id);
	}
	return true;
};
