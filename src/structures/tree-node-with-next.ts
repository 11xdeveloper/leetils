import { treeFromArray } from "./tree-node";

/**
 * A binary tree node with a pointer to the next node to its right on the same
 * level, or `null`, matching the `Node` class LeetCode provides for
 * Populating Next Right Pointers in Each Node.
 */
export class TreeNodeWithNext {
	val: number;
	left: TreeNodeWithNext | null;
	right: TreeNodeWithNext | null;
	next: TreeNodeWithNext | null;

	constructor(
		val?: number,
		left?: TreeNodeWithNext | null,
		right?: TreeNodeWithNext | null,
		next?: TreeNodeWithNext | null,
	) {
		this.val = val ?? 0;
		this.left = left ?? null;
		this.right = right ?? null;
		this.next = next ?? null;
	}
}

/**
 * Builds a tree from LeetCode's level-order array format, where `null` marks
 * a missing child. Every `next` pointer starts as `null`.
 *
 * @example
 * treeWithNextFromArray([1, 2, 3]); // 1 with children 2 and 3
 */
export const treeWithNextFromArray = (
	values: readonly (number | null)[],
): TreeNodeWithNext | null => {
	const plainRoot = treeFromArray(values);
	if (!plainRoot) return null;

	const root = new TreeNodeWithNext(plainRoot.val);
	const queue = [[plainRoot, root] as const];
	for (let head = 0; head < queue.length; head++) {
		const [plain, node] = queue[head] ?? [];
		if (!plain || !node) break;
		if (plain.left) {
			node.left = new TreeNodeWithNext(plain.left.val);
			queue.push([plain.left, node.left]);
		}
		if (plain.right) {
			node.right = new TreeNodeWithNext(plain.right.val);
			queue.push([plain.right, node.right]);
		}
	}

	return root;
};

/**
 * Reads a tree level by level by following `next` pointers, in LeetCode's
 * output format: each level's values followed by `"#"`.
 *
 * @example
 * nextPointersToArray(root); // [1, "#", 2, 3, "#"] once the next pointers are set
 */
export const nextPointersToArray = (
	root: TreeNodeWithNext | null,
): (number | "#")[] => {
	const values: (number | "#")[] = [];

	let levelStart = root;
	while (levelStart) {
		let nextLevelStart: TreeNodeWithNext | null = null;
		for (
			let node: TreeNodeWithNext | null = levelStart;
			node;
			node = node.next
		) {
			values.push(node.val);
			nextLevelStart ??= node.left ?? node.right;
		}
		values.push("#");
		levelStart = nextLevelStart;
	}

	return values;
};
