import type { ListNode } from "../../structures/list-node";

/**
 * 2130. Maximum Twin Sum of a Linked List
 *
 * In a list of even length `n`, node `i` and node `n - 1 - i` are twins.
 * Returns the largest sum of a pair of twins.
 *
 * Find the middle with slow and fast pointers, reverse the second half,
 * then walk both halves together.
 *
 * @see https://leetcode.com/problems/maximum-twin-sum-of-a-linked-list/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * maximumTwinSumOfALinkedList(listFromArray([5, 4, 2, 1])); // 6
 */
export const maximumTwinSumOfALinkedList = (head: ListNode | null): number => {
	let slow = head;
	for (let fast = head; fast?.next; fast = fast.next.next)
		slow = slow?.next ?? null;
	let reversed: ListNode | null = null;
	while (slow) {
		const next: ListNode | null = slow.next;
		slow.next = reversed;
		reversed = slow;
		slow = next;
	}
	let best = 0;
	for (let [a, b] = [head, reversed]; a && b; [a, b] = [a.next, b.next])
		best = Math.max(best, a.val + b.val);
	return best;
};
