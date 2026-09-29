import { ListNode } from "../../structures/list-node";

/**
 * 82. Remove Duplicates from Sorted List II
 *
 * Removes every node whose value appears more than once in a sorted linked
 * list, leaving only values that appeared once, and returns the head. The
 * nodes are relinked, so the input list is modified.
 *
 * Walks the list from a dummy node before the head. Whenever the next value
 * repeats, skips past every node with that value.
 *
 * @see https://leetcode.com/problems/remove-duplicates-from-sorted-list-ii/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * removeDuplicatesFromSortedListII(listFromArray([1, 2, 3, 3, 4, 4, 5])); // 1 -> 2 -> 5
 */
export const removeDuplicatesFromSortedListII = (
	head: ListNode | null,
): ListNode | null => {
	const dummy = new ListNode(0, head);
	let previous = dummy;

	while (previous.next !== null) {
		const current = previous.next;
		if (current.next !== null && current.next.val === current.val) {
			let after: ListNode | null = current.next;
			while (after !== null && after.val === current.val) after = after.next;
			previous.next = after;
		} else {
			previous = current;
		}
	}

	return dummy.next;
};
