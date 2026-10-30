import { TreeNode } from "../../structures/tree-node";

/**
 * 2196. Create Binary Tree From Descriptions
 *
 * Each description `[parent, child, isLeft]` says `child` is the left (1)
 * or right (0) child of `parent`. Builds the tree and returns its root.
 *
 * Create nodes on demand, link them, and return the one that is never a
 * child.
 *
 * @see https://leetcode.com/problems/create-binary-tree-from-descriptions/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * createBinaryTreeFromDescriptions([[1, 2, 1], [2, 3, 0], [3, 4, 1]]); // [1, 2, null, null, 3, 4]
 */
export const createBinaryTreeFromDescriptions = (
	descriptions: readonly (readonly number[])[],
): TreeNode | null => {
	const nodes = new Map<number, TreeNode>();
	const node = (value: number): TreeNode => {
		let existing = nodes.get(value);
		if (!existing) {
			existing = new TreeNode(value);
			nodes.set(value, existing);
		}
		return existing;
	};
	const children = new Set<number>();
	for (const [parent = 0, child = 0, isLeft = 0] of descriptions) {
		if (isLeft) node(parent).left = node(child);
		else node(parent).right = node(child);
		children.add(child);
	}
	for (const [value, root] of nodes) if (!children.has(value)) return root;
	return null;
};
