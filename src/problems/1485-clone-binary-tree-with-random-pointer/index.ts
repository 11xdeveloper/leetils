import { TreeNodeWithRandom } from "../../structures/tree-node-with-random";

/**
 * 1485. Clone Binary Tree With Random Pointer
 *
 * Returns a deep copy of a binary tree whose nodes also have a `random`
 * pointer to any node in the tree (or `null`).
 *
 * Copies the tree's shape with an explicit stack, mapping each original
 * node to its copy, then points each copy's `random` at the copy of the
 * original's target.
 *
 * @see https://leetcode.com/problems/clone-binary-tree-with-random-pointer/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * treeWithRandomToArray(cloneBinaryTreeWithRandomPointer(treeWithRandomFromArray([[1, null], null, [4, 3], [7, 0]])));
 * // [[1, null], null, [4, 3], [7, 0]]
 */
export const cloneBinaryTreeWithRandomPointer = (
	root: TreeNodeWithRandom | null,
): TreeNodeWithRandom | null => {
	if (!root) return null;
	const copies = new Map<TreeNodeWithRandom, TreeNodeWithRandom>([
		[root, new TreeNodeWithRandom(root.val)],
	]);
	const stack = [root];
	for (let node = stack.pop(); node; node = stack.pop()) {
		const copy = copies.get(node);
		if (!copy) continue;
		if (node.left) {
			copy.left = new TreeNodeWithRandom(node.left.val);
			copies.set(node.left, copy.left);
			stack.push(node.left);
		}
		if (node.right) {
			copy.right = new TreeNodeWithRandom(node.right.val);
			copies.set(node.right, copy.right);
			stack.push(node.right);
		}
	}
	for (const [original, copy] of copies) {
		copy.random = original.random
			? (copies.get(original.random) ?? null)
			: null;
	}
	return copies.get(root) ?? null;
};
