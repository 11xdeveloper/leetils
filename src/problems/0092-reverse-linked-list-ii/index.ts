import { ListNode } from "../../structures/list-node";

/**
 * 92. Reverse Linked List II
 *
 * Reverses the nodes of a linked list from position `left` to position
 * `right`, counting from 1, and returns the head. The nodes are relinked, so
 * the input list is modified.
 *
 * Walks to the node before `left`, then moves each following node in the
 * range to just after it, one at a time, all in a single pass.
 *
 * @see https://leetcode.com/problems/reverse-linked-list-ii/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * reverseLinkedListII(listFromArray([1, 2, 3, 4, 5]), 2, 4); // 1 -> 4 -> 3 -> 2 -> 5
 */
export const reverseLinkedListII = (
	head: ListNode | null,
	left: number,
	right: number,
): ListNode | null => {
	const dummy = new ListNode(0, head);
	let before = dummy;
	for (let i = 1; i < left && before.next !== null; i++) before = before.next;

	// `first` stays put as the reversed range grows in front of it.
	const first = before.next;
	for (let i = left; i < right && first?.next; i++) {
		const moved: ListNode = first.next;
		first.next = moved.next;
		moved.next = before.next;
		before.next = moved;
	}

	return dummy.next;
};
