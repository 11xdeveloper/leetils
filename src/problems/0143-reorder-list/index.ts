import type { ListNode } from "../../structures/list-node";

/**
 * 143. Reorder List
 *
 * Reorders the list L0 → L1 → … → Ln into L0 → Ln → L1 → Ln-1 → …, in place
 * by relinking the nodes, as the problem requires.
 *
 * Finds the middle with slow and fast pointers, reverses the second half,
 * then weaves the two halves together.
 *
 * @see https://leetcode.com/problems/reorder-list/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * const head = listFromArray([1, 2, 3, 4, 5]);
 * reorderList(head); // head is now 1 -> 5 -> 2 -> 4 -> 3
 */
export const reorderList = (head: ListNode | null): void => {
	let slow = head;
	let fast = head;
	while (fast?.next?.next) {
		slow = slow?.next ?? null;
		fast = fast.next.next;
	}

	// Split after the middle and reverse the second half.
	let second = slow?.next ?? null;
	if (slow) slow.next = null;
	let reversed: ListNode | null = null;
	while (second) {
		const next: ListNode | null = second.next;
		second.next = reversed;
		reversed = second;
		second = next;
	}

	let first = head;
	while (first && reversed) {
		const firstNext: ListNode | null = first.next;
		const reversedNext: ListNode | null = reversed.next;
		first.next = reversed;
		reversed.next = firstNext;
		first = firstNext;
		reversed = reversedNext;
	}
};
