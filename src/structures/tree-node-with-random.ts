/**
 * A binary tree node with an extra pointer to any node in the tree, or
 * `null`, matching the `Node` class LeetCode provides for Clone Binary Tree
 * With Random Pointer.
 */
export class TreeNodeWithRandom {
	val: number;
	left: TreeNodeWithRandom | null;
	right: TreeNodeWithRandom | null;
	random: TreeNodeWithRandom | null;

	constructor(
		val?: number,
		left?: TreeNodeWithRandom | null,
		right?: TreeNodeWithRandom | null,
		random?: TreeNodeWithRandom | null,
	) {
		this.val = val ?? 0;
		this.left = left ?? null;
		this.right = right ?? null;
		this.random = random ?? null;
	}
}

/**
 * Builds a tree from LeetCode's format: the level-order array of binary
 * trees, where each node is a `[val, randomIndex]` pair (`randomIndex` being
 * the array position of the node `random` points to, or `null`) and `null`
 * marks a missing child.
 *
 * @example
 * treeWithRandomFromArray([[1, null], null, [4, 3], [7, 0]])?.right?.random?.val; // 7
 */
export const treeWithRandomFromArray = (
	entries: readonly (
		| readonly [val: number, randomIndex: number | null]
		| null
	)[],
): TreeNodeWithRandom | null => {
	const nodes = entries.map((entry) =>
		entry ? new TreeNodeWithRandom(entry[0]) : null,
	);
	const root = nodes[0] ?? null;
	if (!root) return null;

	const queue = [root];
	let next = 1;
	for (let head = 0; head < queue.length && next < nodes.length; head++) {
		const node = queue[head];
		if (!node) break;
		node.left = nodes[next++] ?? null;
		if (node.left) queue.push(node.left);
		node.right = nodes[next++] ?? null;
		if (node.right) queue.push(node.right);
	}

	entries.forEach((entry, i) => {
		const node = nodes[i];
		const randomIndex = entry?.[1] ?? null;
		if (node)
			node.random = randomIndex === null ? null : (nodes[randomIndex] ?? null);
	});
	return root;
};

/**
 * Converts a tree back into LeetCode's `[val, randomIndex]` level-order
 * format, without trailing `null`s.
 *
 * @example
 * treeWithRandomToArray(treeWithRandomFromArray([[1, null], null, [4, 3], [7, 0]])); // [[1, null], null, [4, 3], [7, 0]]
 */
export const treeWithRandomToArray = (
	root: TreeNodeWithRandom | null,
): ([val: number, randomIndex: number | null] | null)[] => {
	const slots: (TreeNodeWithRandom | null)[] = [];
	const queue: (TreeNodeWithRandom | null)[] = [root];
	for (let head = 0; head < queue.length; head++) {
		const node = queue[head] ?? null;
		slots.push(node);
		if (node) queue.push(node.left, node.right);
	}
	while (slots.length > 0 && slots.at(-1) === null) slots.pop();

	const index = new Map<TreeNodeWithRandom, number>();
	slots.forEach((node, i) => {
		if (node) index.set(node, i);
	});
	return slots.map((node) =>
		node
			? [node.val, node.random ? (index.get(node.random) ?? null) : null]
			: null,
	);
};
