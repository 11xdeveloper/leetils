import { ListNode } from "../../structures/list-node";

/**
 * 1836. Remove Duplicates From an Unsorted Linked List
 *
 * Removes every node whose value appears more than once in the list.
 *
 * Count values in one pass, then unlink the repeated ones behind a dummy
 * head.
 *
 * @see https://leetcode.com/problems/remove-duplicates-from-an-unsorted-linked-list/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * listToArray(removeDuplicatesFromAnUnsortedLinkedList(listFromArray([3, 2, 2, 1, 3, 2, 4]))); // [1, 4]
 */
export const removeDuplicatesFromAnUnsortedLinkedList = (
	head: ListNode | null,
): ListNode | null => {
	const counts = new Map<number, number>();
	for (let node = head; node; node = node.next)
		counts.set(node.val, (counts.get(node.val) ?? 0) + 1);
	const dummy = new ListNode(0, head);
	for (let node = dummy; node.next; ) {
		if ((counts.get(node.next.val) ?? 0) > 1) node.next = node.next.next;
		else node = node.next;
	}
	return dummy.next;
};
