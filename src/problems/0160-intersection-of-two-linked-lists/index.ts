import type { ListNode } from "../../structures/list-node";

/**
 * 160. Intersection of Two Linked Lists
 *
 * Returns the first node shared by two linked lists, which join into a
 * single tail from that node on, or `null` if they never meet. The lists are
 * not modified.
 *
 * Two pointers walk the lists, each switching to the other list's head when
 * it reaches the end. Both then travel the same total distance before
 * reaching the shared node (or `null`) at the same time.
 *
 * @see https://leetcode.com/problems/intersection-of-two-linked-lists/
 * @difficulty Easy
 * @timeComplexity O(m + n)
 * @spaceComplexity O(1)
 *
 * @example
 * intersectionOfTwoLinkedLists(headA, headB); // the first node both lists share, or null
 */
export const intersectionOfTwoLinkedLists = (
	headA: ListNode | null,
	headB: ListNode | null,
): ListNode | null => {
	let a = headA;
	let b = headB;

	while (a !== b) {
		a = a ? a.next : headB;
		b = b ? b.next : headA;
	}

	return a;
};
