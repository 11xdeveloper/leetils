import { treeFromArray } from "./tree-node";

/**
 * A binary tree node with a pointer to its parent, or `null` for the root,
 * matching the `Node` class LeetCode provides for problems like Inorder
 * Successor in BST II.
 */
export class TreeNodeWithParent {
	val: number;
	left: TreeNodeWithParent | null;
	right: TreeNodeWithParent | null;
	parent: TreeNodeWithParent | null;

	constructor(
		val?: number,
		left?: TreeNodeWithParent | null,
		right?: TreeNodeWithParent | null,
		parent?: TreeNodeWithParent | null,
	) {
		this.val = val ?? 0;
		this.left = left ?? null;
		this.right = right ?? null;
		this.parent = parent ?? null;
	}
}

/**
 * Builds a tree from LeetCode's level-order array format, where `null` marks
 * a missing child, with every node's `parent` set.
 *
 * @example
 * treeWithParentFromArray([1, 2, 3])?.left?.parent?.val; // 1
 */
export const treeWithParentFromArray = (
	values: readonly (number | null)[],
): TreeNodeWithParent | null => {
	const plainRoot = treeFromArray(values);
	if (!plainRoot) return null;

	const root = new TreeNodeWithParent(plainRoot.val);
	const queue = [[plainRoot, root] as const];
	for (let head = 0; head < queue.length; head++) {
		const [plain, node] = queue[head] ?? [];
		if (!plain || !node) break;
		if (plain.left) {
			node.left = new TreeNodeWithParent(plain.left.val, null, null, node);
			queue.push([plain.left, node.left]);
		}
		if (plain.right) {
			node.right = new TreeNodeWithParent(plain.right.val, null, null, node);
			queue.push([plain.right, node.right]);
		}
	}

	return root;
};
