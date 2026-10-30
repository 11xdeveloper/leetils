import { ListNode } from "../../structures/list-node";

/**
 * 2816. Double a Number Represented as a Linked List
 *
 * The list holds a number's digits, most significant first. Returns the
 * list of the number doubled.
 *
 * A digit's carry into the one before it is 1 exactly when the next
 * digit is at least 5, so double each digit in place and add that carry;
 * a leading digit of 5 or more needs a new head.
 *
 * @see https://leetcode.com/problems/double-a-number-represented-as-a-linked-list/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * listToArray(doubleANumberRepresentedAsALinkedList(listFromArray([9, 9, 9]))); // [1, 9, 9, 8]
 */
export const doubleANumberRepresentedAsALinkedList = (
	head: ListNode | null,
): ListNode | null => {
	const start = head && head.val >= 5 ? new ListNode(0, head) : head;
	for (let node = start; node; node = node.next)
		node.val = (2 * node.val + ((node.next?.val ?? 0) >= 5 ? 1 : 0)) % 10;
	return start;
};
