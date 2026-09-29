/**
 * A binary tree node, matching the `TreeNode` class LeetCode provides.
 */
export class TreeNode {
	val: number;
	left: TreeNode | null;
	right: TreeNode | null;

	constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
		this.val = val ?? 0;
		this.left = left ?? null;
		this.right = right ?? null;
	}
}

const isValue = (value: number | null | undefined): value is number =>
	typeof value === "number";

/**
 * Builds a binary tree from LeetCode's level-order array format, where `null`
 * marks a missing child. Returns `null` for an empty array.
 *
 * @example
 * treeFromArray([1, null, 2, 3]); // 1 has no left child; its right child 2 has a left child 3
 */
export const treeFromArray = (
	values: readonly (number | null)[],
): TreeNode | null => {
	const [rootValue] = values;
	if (!isValue(rootValue)) return null;

	const root = new TreeNode(rootValue);
	const queue: TreeNode[] = [root];
	let next = 1;

	for (let head = 0; head < queue.length && next < values.length; head++) {
		const node = queue[head];
		if (!node) break;

		const left = values[next++];
		if (isValue(left)) {
			node.left = new TreeNode(left);
			queue.push(node.left);
		}

		const right = values[next++];
		if (isValue(right)) {
			node.right = new TreeNode(right);
			queue.push(node.right);
		}
	}

	return root;
};

/**
 * Converts a binary tree into LeetCode's level-order array format, without
 * trailing `null`s.
 *
 * @example
 * treeToArray(treeFromArray([1, null, 2, 3])); // [1, null, 2, 3]
 */
export const treeToArray = (root: TreeNode | null): (number | null)[] => {
	const values: (number | null)[] = [];
	const queue: (TreeNode | null)[] = [root];

	for (let head = 0; head < queue.length; head++) {
		const node = queue[head];
		if (node) {
			values.push(node.val);
			queue.push(node.left, node.right);
		} else {
			values.push(null);
		}
	}

	while (values.at(-1) === null) values.pop();

	return values;
};
