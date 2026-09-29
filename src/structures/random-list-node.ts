/**
 * A linked list node with an extra pointer to any node in the list, or
 * `null`, matching the `Node` class LeetCode provides for Copy List with
 * Random Pointer.
 */
export class RandomListNode {
	val: number;
	next: RandomListNode | null;
	random: RandomListNode | null;

	constructor(
		val?: number,
		next?: RandomListNode | null,
		random?: RandomListNode | null,
	) {
		this.val = val ?? 0;
		this.next = next ?? null;
		this.random = random ?? null;
	}
}

/**
 * Builds a list from LeetCode's format: one `[val, randomIndex]` pair per
 * node, where `randomIndex` is the index of the node `random` points to, or
 * `null`.
 *
 * @example
 * randomListFromArray([[7, null], [13, 0]]); // 7 -> 13, and 13's random pointer is 7
 */
export const randomListFromArray = (
	entries: readonly (readonly [val: number, randomIndex: number | null])[],
): RandomListNode | null => {
	const nodes = entries.map(([val]) => new RandomListNode(val));

	for (const [i, [, randomIndex]] of entries.entries()) {
		const node = nodes[i];
		if (!node) continue;
		node.next = nodes[i + 1] ?? null;
		node.random = randomIndex === null ? null : (nodes[randomIndex] ?? null);
	}

	return nodes[0] ?? null;
};

/**
 * Converts a list back into LeetCode's `[val, randomIndex]` format.
 *
 * @example
 * randomListToArray(randomListFromArray([[7, null], [13, 0]])); // [[7, null], [13, 0]]
 */
export const randomListToArray = (
	head: RandomListNode | null,
): [val: number, randomIndex: number | null][] => {
	const nodes: RandomListNode[] = [];
	for (let node = head; node !== null; node = node.next) nodes.push(node);

	const indices = new Map(nodes.map((node, i) => [node, i]));
	return nodes.map((node) => [
		node.val,
		node.random === null ? null : (indices.get(node.random) ?? null),
	]);
};
