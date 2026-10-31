import type { DoublyListNode } from "../../structures/doubly-list-node";

/**
 * 3294. Convert Doubly Linked List to Array II
 *
 * The values of a doubly linked list in order, given any one of its nodes.
 *
 * Walk back to the head, then forwards to the end.
 *
 * @see https://leetcode.com/problems/convert-doubly-linked-list-to-array-ii/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * convertDoublyLinkedListToArrayII(doublyListFromArray([1, 2, 3])[2] ?? null); // [1, 2, 3]
 */
export const convertDoublyLinkedListToArrayII = (
	node: DoublyListNode | null,
): number[] => {
	let head = node;
	while (head?.prev) head = head.prev;
	const values: number[] = [];
	for (let current = head; current; current = current.next)
		values.push(current.val);
	return values;
};
