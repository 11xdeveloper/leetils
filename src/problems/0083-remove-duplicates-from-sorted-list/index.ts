import type { ListNode } from "../../structures/list-node";

/**
 * 83. Remove Duplicates from Sorted List
 *
 * Removes repeated values from a sorted linked list so each value appears
 * once, and returns the head. The nodes are relinked, so the input list is
 * modified.
 *
 * Unlinks each node whose value equals the one before it.
 *
 * @see https://leetcode.com/problems/remove-duplicates-from-sorted-list/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * removeDuplicatesFromSortedList(listFromArray([1, 1, 2, 3, 3])); // 1 -> 2 -> 3
 */
export const removeDuplicatesFromSortedList = (
	head: ListNode | null,
): ListNode | null => {
	let node = head;

	while (node !== null && node.next !== null) {
		if (node.next.val === node.val) node.next = node.next.next;
		else node = node.next;
	}

	return head;
};
