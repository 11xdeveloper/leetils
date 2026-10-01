import type { ListNode } from "../../structures/list-node";

/**
 * 328. Odd Even Linked List
 *
 * Regroups a linked list so all the nodes at odd positions (1st, 3rd, …)
 * come first, followed by those at even positions, keeping the order within
 * each group, and returns the head. The nodes are relinked, so the input
 * list is modified.
 *
 * Builds the two groups as it walks, each node linking to the one two
 * places ahead, then joins the even group onto the end of the odd one.
 *
 * @see https://leetcode.com/problems/odd-even-linked-list/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * oddEvenLinkedList(listFromArray([1, 2, 3, 4, 5])); // 1 -> 3 -> 5 -> 2 -> 4
 */
export const oddEvenLinkedList = (head: ListNode | null): ListNode | null => {
	if (!head) return null;

	let odd = head;
	const evenHead = head.next;
	let even = evenHead;
	while (even?.next) {
		odd.next = even.next;
		odd = even.next;
		even.next = odd.next;
		even = odd.next;
	}

	odd.next = evenHead;
	return head;
};
