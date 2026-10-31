import type { DoublyListNode } from "../../structures/doubly-list-node";

/**
 * 3263. Convert Doubly Linked List to Array I
 *
 * The values of a doubly linked list, in order from its head.
 *
 * Follow the `next` pointers.
 *
 * @see https://leetcode.com/problems/convert-doubly-linked-list-to-array-i/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * convertDoublyLinkedListToArrayI(doublyListFromArray([1, 2, 3])[0] ?? null); // [1, 2, 3]
 */
export const convertDoublyLinkedListToArrayI = (
	head: DoublyListNode | null,
): number[] => {
	const values: number[] = [];
	for (let node = head; node; node = node.next) values.push(node.val);
	return values;
};
