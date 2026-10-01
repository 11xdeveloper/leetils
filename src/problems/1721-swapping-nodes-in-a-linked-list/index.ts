import type { ListNode } from "../../structures/list-node";

/**
 * 1721. Swapping Nodes in a Linked List
 *
 * Swaps the values of the `k`-th node from the start and the `k`-th node
 * from the end, returning the head.
 *
 * A pointer starting `k` nodes ahead reaches the end just as a pointer
 * from the head reaches the `k`-th node from the end.
 *
 * @see https://leetcode.com/problems/swapping-nodes-in-a-linked-list/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * listToArray(swappingNodesInALinkedList(listFromArray([1, 2, 3, 4, 5]), 2)); // [1, 4, 3, 2, 5]
 */
export const swappingNodesInALinkedList = (
	head: ListNode | null,
	k: number,
): ListNode | null => {
	let front = head;
	for (let i = 1; i < k && front; i++) front = front.next;
	let [back, runner] = [head, front?.next ?? null];
	while (runner && back) {
		back = back.next;
		runner = runner.next;
	}
	if (front && back) [front.val, back.val] = [back.val, front.val];
	return head;
};
