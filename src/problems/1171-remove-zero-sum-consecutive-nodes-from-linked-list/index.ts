import { ListNode } from "../../structures/list-node";

/**
 * 1171. Remove Zero Sum Consecutive Nodes from Linked List
 *
 * Repeatedly deletes runs of consecutive nodes summing to 0 until none are
 * left, in place, and returns the new head.
 *
 * A run sums to 0 exactly when the running totals before and after it are
 * equal. The first pass records the last node reaching each running total;
 * the second links each node straight past everything up to that last node
 * with the same total, which cuts out every zero-sum run.
 *
 * @see https://leetcode.com/problems/remove-zero-sum-consecutive-nodes-from-linked-list/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * listToArray(removeZeroSumConsecutiveNodesFromLinkedList(listFromArray([1, 2, 3, -3, 4]))); // [1, 2, 4]
 */
export const removeZeroSumConsecutiveNodesFromLinkedList = (
	head: ListNode | null,
): ListNode | null => {
	const dummy = new ListNode(0, head);
	const lastWithTotal = new Map<number, ListNode>();
	let total = 0;
	for (let node: ListNode | null = dummy; node; node = node.next) {
		total += node.val;
		lastWithTotal.set(total, node);
	}
	total = 0;
	for (let node: ListNode | null = dummy; node; node = node.next) {
		total += node.val;
		node.next = lastWithTotal.get(total)?.next ?? null;
	}
	return dummy.next;
};
