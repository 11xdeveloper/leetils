/**
 * A node of an N-ary tree, matching the `Node` class LeetCode provides for
 * N-ary tree problems.
 */
export class NaryTreeNode {
	val: number;
	children: NaryTreeNode[];

	constructor(val?: number, children?: NaryTreeNode[]) {
		this.val = val ?? 0;
		this.children = children ?? [];
	}
}

/**
 * Builds an N-ary tree from LeetCode's level-order format, where each
 * node's children are listed in turn and each group ends with `null`.
 * Returns `null` for an empty array.
 *
 * @example
 * naryTreeFromArray([1, null, 3, 2, 4, null, 5, 6]); // 1 with children 3, 2 and 4; 3 has children 5 and 6
 */
export const naryTreeFromArray = (
	values: readonly (number | null)[],
): NaryTreeNode | null => {
	const [rootValue] = values;
	if (rootValue === undefined || rootValue === null) return null;

	const root = new NaryTreeNode(rootValue);
	const queue = [root];
	// values[1] is the null ending the root's own group.
	let next = 2;
	for (let head = 0; head < queue.length && next < values.length; head++) {
		const node = queue[head];
		if (!node) break;
		for (
			let value = values[next++];
			value !== null && value !== undefined;
			value = values[next++]
		) {
			const child = new NaryTreeNode(value);
			node.children.push(child);
			queue.push(child);
		}
	}

	return root;
};

/**
 * Converts an N-ary tree into LeetCode's level-order format, without
 * trailing `null`s.
 *
 * @example
 * naryTreeToArray(naryTreeFromArray([1, null, 3, 2, 4])); // [1, null, 3, 2, 4]
 */
export const naryTreeToArray = (
	root: NaryTreeNode | null,
): (number | null)[] => {
	if (!root) return [];

	const values: (number | null)[] = [root.val, null];
	const queue = [root];
	for (let head = 0; head < queue.length; head++) {
		for (const child of queue[head]?.children ?? []) {
			values.push(child.val);
			queue.push(child);
		}
		values.push(null);
	}

	while (values.at(-1) === null) values.pop();
	return values;
};
