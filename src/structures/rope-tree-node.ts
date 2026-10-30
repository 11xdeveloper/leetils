/**
 * A node of a rope tree, matching the `RopeTreeNode` class LeetCode
 * provides for Extract Kth Character From The Rope Tree. A leaf holds a
 * string in `val` and has `len` 0; an internal node has an empty `val`
 * and `len` set to the length of the string it represents.
 */
export class RopeTreeNode {
	len: number;
	val: string;
	left: RopeTreeNode | null;
	right: RopeTreeNode | null;

	constructor(
		len?: number,
		val?: string,
		left?: RopeTreeNode | null,
		right?: RopeTreeNode | null,
	) {
		this.len = len ?? 0;
		this.val = val ?? "";
		this.left = left ?? null;
		this.right = right ?? null;
	}
}

/**
 * Builds a rope tree from LeetCode's level-order format, where a string
 * is a leaf, a number is an internal node's `len`, and `null` marks a
 * missing child. Returns `null` for an empty array.
 *
 * @example
 * ropeTreeFromArray([10, 4, "abcpoe", "g", "rta"])?.right?.val; // "abcpoe"
 */
export const ropeTreeFromArray = (
	values: readonly (number | string | null)[],
): RopeTreeNode | null => {
	const make = (
		value: number | string | null | undefined,
	): RopeTreeNode | null => {
		if (value === null || value === undefined) return null;
		return typeof value === "string"
			? new RopeTreeNode(0, value)
			: new RopeTreeNode(value);
	};
	const root = make(values[0]);
	if (!root) return null;

	const queue: RopeTreeNode[] = [root];
	let next = 1;
	for (let head = 0; head < queue.length && next < values.length; head++) {
		const node = queue[head];
		if (!node) break;
		node.left = make(values[next++]);
		if (node.left) queue.push(node.left);
		node.right = make(values[next++]);
		if (node.right) queue.push(node.right);
	}
	return root;
};
