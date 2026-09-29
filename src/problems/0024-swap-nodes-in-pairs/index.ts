import { ListNode } from "../../structures/list-node";

/**
 * 24. Swap Nodes in Pairs
 *
 * Swaps every two adjacent nodes of a linked list and returns its head. As
 * the problem requires, the nodes themselves are moved rather than their
 * values, so the input list is modified.
 *
 * Walks the list from a dummy node before the head, relinking each pair
 * so the second node comes first.
 *
 * @see https://leetcode.com/problems/swap-nodes-in-pairs/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * swapNodesInPairs(listFromArray([1, 2, 3, 4])); // 2 -> 1 -> 4 -> 3
 */
export const swapNodesInPairs = (head: ListNode | null): ListNode | null => {
	const dummy = new ListNode(0, head);
	let previous = dummy;

	while (previous.next !== null && previous.next.next !== null) {
		const first = previous.next;
		const second = previous.next.next;

		first.next = second.next;
		second.next = first;
		previous.next = second;
		previous = first;
	}

	return dummy.next;
};
