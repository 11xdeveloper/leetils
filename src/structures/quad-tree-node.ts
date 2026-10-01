/**
 * A node of a quad tree, matching the `Node` class LeetCode provides for
 * quad tree problems. A leaf covers a region of one value; any other node
 * has exactly four children.
 */
export class QuadTreeNode {
	val: boolean;
	isLeaf: boolean;
	topLeft: QuadTreeNode | null;
	topRight: QuadTreeNode | null;
	bottomLeft: QuadTreeNode | null;
	bottomRight: QuadTreeNode | null;

	constructor(
		val?: boolean,
		isLeaf?: boolean,
		topLeft?: QuadTreeNode | null,
		topRight?: QuadTreeNode | null,
		bottomLeft?: QuadTreeNode | null,
		bottomRight?: QuadTreeNode | null,
	) {
		this.val = val ?? false;
		this.isLeaf = isLeaf ?? false;
		this.topLeft = topLeft ?? null;
		this.topRight = topRight ?? null;
		this.bottomLeft = bottomLeft ?? null;
		this.bottomRight = bottomRight ?? null;
	}
}

/** A quad tree node in LeetCode's format: `[isLeaf, val]`, each 0 or 1. */
export type QuadTreeEntry = [isLeaf: number, val: number];

/**
 * Builds a quad tree from LeetCode's level-order format, where each node is
 * `[isLeaf, val]` and `null` marks a missing child. Returns `null` for an
 * empty array.
 *
 * @example
 * quadTreeFromArray([[0, 1], [1, 0], [1, 1], [1, 1], [1, 0]]); // a root with four leaves
 */
export const quadTreeFromArray = (
	values: readonly (readonly [number, number] | null)[],
): QuadTreeNode | null => {
	const toNode = (
		entry: readonly [number, number] | null | undefined,
	): QuadTreeNode | null =>
		entry ? new QuadTreeNode(entry[1] === 1, entry[0] === 1) : null;

	const root = toNode(values[0]);
	if (!root) return null;
	const queue = [root];
	let next = 1;
	for (let head = 0; head < queue.length && next < values.length; head++) {
		const node = queue[head];
		if (!node) break;
		node.topLeft = toNode(values[next++]);
		node.topRight = toNode(values[next++]);
		node.bottomLeft = toNode(values[next++]);
		node.bottomRight = toNode(values[next++]);
		for (const child of [
			node.topLeft,
			node.topRight,
			node.bottomLeft,
			node.bottomRight,
		]) {
			if (child) queue.push(child);
		}
	}

	return root;
};

/**
 * Converts a quad tree into LeetCode's level-order format, without trailing
 * `null`s.
 *
 * @example
 * quadTreeToArray(new QuadTreeNode(true, true)); // [[1, 1]]
 */
export const quadTreeToArray = (
	root: QuadTreeNode | null,
): (QuadTreeEntry | null)[] => {
	const values: (QuadTreeEntry | null)[] = [];
	const queue: (QuadTreeNode | null)[] = [root];
	for (let head = 0; head < queue.length; head++) {
		const node = queue[head];
		if (!node) {
			values.push(null);
			continue;
		}
		values.push([node.isLeaf ? 1 : 0, node.val ? 1 : 0]);
		if (!node.isLeaf)
			queue.push(
				node.topLeft,
				node.topRight,
				node.bottomLeft,
				node.bottomRight,
			);
		else queue.push(null, null, null, null);
	}

	while (values.at(-1) === null) values.pop();
	return values;
};
