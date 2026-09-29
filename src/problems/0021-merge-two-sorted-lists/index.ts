import { ListNode } from "../../structures/list-node";

/**
 * 21. Merge Two Sorted Lists
 *
 * Merges two sorted linked lists into one sorted list and returns its head.
 * As the problem requires, the result is made by splicing together the input
 * nodes, so the input lists are modified.
 *
 * Repeatedly attaches the smaller of the two front nodes to the result, then
 * attaches whatever is left of the other list.
 *
 * @see https://leetcode.com/problems/merge-two-sorted-lists/
 * @difficulty Easy
 * @timeComplexity O(m + n)
 * @spaceComplexity O(1)
 *
 * @example
 * mergeTwoSortedLists(listFromArray([1, 2, 4]), listFromArray([1, 3, 4])); // 1 -> 1 -> 2 -> 3 -> 4 -> 4
 */
export const mergeTwoSortedLists = (
	list1: ListNode | null,
	list2: ListNode | null,
): ListNode | null => {
	const dummy = new ListNode();
	let tail = dummy;
	let a = list1;
	let b = list2;

	while (a !== null && b !== null) {
		if (a.val <= b.val) {
			tail.next = a;
			tail = a;
			a = a.next;
		} else {
			tail.next = b;
			tail = b;
			b = b.next;
		}
	}

	tail.next = a ?? b;
	return dummy.next;
};
