/**
 * A doubly linked list node that may also point to a child list, matching
 * the `Node` class LeetCode provides for Flatten a Multilevel Doubly Linked
 * List.
 */
export class MultilevelListNode {
	val: number;
	prev: MultilevelListNode | null;
	next: MultilevelListNode | null;
	child: MultilevelListNode | null;

	constructor(
		val?: number,
		prev?: MultilevelListNode | null,
		next?: MultilevelListNode | null,
		child?: MultilevelListNode | null,
	) {
		this.val = val ?? 0;
		this.prev = prev ?? null;
		this.next = next ?? null;
		this.child = child ?? null;
	}
}

/**
 * Builds a multilevel list from LeetCode's format: each level's values end
 * with `null`, then as many further `null`s as the position (in the level
 * above) of the node the next level hangs from.
 *
 * @example
 * multilevelListFromArray([1, 2, null, 3]); // 1 <-> 2, and 1's child is the list 3
 */
export const multilevelListFromArray = (
	values: readonly (number | null)[],
): MultilevelListNode | null => {
	let head: MultilevelListNode | null = null;
	let previousLevel: MultilevelListNode[] = [];
	let i = 0;

	while (i < values.length) {
		// Nulls before a level give the index of its parent in the level above.
		let parentIndex = 0;
		if (previousLevel.length > 0) {
			while (values[i] === null && i < values.length) {
				parentIndex++;
				i++;
			}
		}

		const level: MultilevelListNode[] = [];
		for (
			let value = values[i];
			value !== null && value !== undefined;
			value = values[++i]
		) {
			const node = new MultilevelListNode(value, level.at(-1) ?? null);
			const previous = level.at(-1);
			if (previous) previous.next = node;
			level.push(node);
		}
		i++;

		if (previousLevel.length === 0) head = level[0] ?? null;
		else {
			const parent = previousLevel[parentIndex];
			if (parent) parent.child = level[0] ?? null;
		}
		previousLevel = level;
	}

	return head;
};

/**
 * Converts a multilevel list back into LeetCode's format. As in that format,
 * each level can have at most one node with a child.
 *
 * @example
 * multilevelListToArray(multilevelListFromArray([1, 2, null, 3])); // [1, 2, null, 3]
 */
export const multilevelListToArray = (
	head: MultilevelListNode | null,
): (number | null)[] => {
	const values: (number | null)[] = [];
	for (let level = head; level; ) {
		let child: MultilevelListNode | null = null;
		let childIndex = 0;
		let index = 0;
		for (
			let node: MultilevelListNode | null = level;
			node;
			node = node.next, index++
		) {
			values.push(node.val);
			if (node.child && !child) {
				child = node.child;
				childIndex = index;
			}
		}
		values.push(null);
		for (let i = 0; i < childIndex; i++) values.push(null);
		level = child;
	}

	while (values.at(-1) === null) values.pop();
	return values;
};
