/**
 * A doubly linked list node, matching the `Node` class LeetCode provides
 * for Convert Doubly Linked List to Array.
 */
export class DoublyListNode {
	val: number;
	prev: DoublyListNode | null;
	next: DoublyListNode | null;

	constructor(
		val?: number,
		prev?: DoublyListNode | null,
		next?: DoublyListNode | null,
	) {
		this.val = val ?? 0;
		this.prev = prev ?? null;
		this.next = next ?? null;
	}
}

/**
 * Builds a doubly linked list from an array and returns its nodes in
 * order, so a caller can start from any of them. Returns an empty array
 * for an empty input.
 *
 * @example
 * doublyListFromArray([1, 2, 3])[2]?.prev?.val; // 2
 */
export const doublyListFromArray = (
	values: readonly number[],
): DoublyListNode[] => {
	const nodes = values.map((value) => new DoublyListNode(value));
	nodes.forEach((node, i) => {
		node.prev = nodes[i - 1] ?? null;
		node.next = nodes[i + 1] ?? null;
	});
	return nodes;
};
