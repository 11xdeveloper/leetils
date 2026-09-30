import type { ListNode } from "../../structures/list-node";

/**
 * 1290. Convert Binary Number in a Linked List to Integer
 *
 * The list holds the bits of a number, most significant first. Returns the
 * number.
 *
 * Doubles the running value and adds each bit.
 *
 * @see https://leetcode.com/problems/convert-binary-number-in-a-linked-list-to-integer/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * convertBinaryNumberInALinkedListToInteger(listFromArray([1, 0, 1])); // 5
 */
export const convertBinaryNumberInALinkedListToInteger = (
	head: ListNode | null,
): number => {
	let value = 0;
	for (let node = head; node; node = node.next) value = value * 2 + node.val;
	return value;
};
