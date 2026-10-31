import type { ListNode } from "../../structures/list-node";

/**
 * 2074. Reverse Nodes in Even Length Groups
 *
 * Splits a linked list into groups of 1, 2, 3, … nodes (the last group
 * may be shorter) and reverses every group of even length.
 *
 * Walk group by group from the node before each group, measuring its
 * actual length and reversing it in place when even.
 *
 * @see https://leetcode.com/problems/reverse-nodes-in-even-length-groups/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * reverseNodesInEvenLengthGroups(listFromArray([5, 2, 6, 3, 9, 1, 7, 3, 8, 4])); // 5 -> 6 -> 2 -> 3 -> 9 -> 1 -> 4 -> 8 -> 3 -> 7
 */
export const reverseNodesInEvenLengthGroups = (
	head: ListNode | null,
): ListNode | null => {
	// The first group has one node, so it is never reversed.
	let before = head;
	for (let size = 2; before?.next; size++) {
		let length = 0;
		let after: ListNode | null = before.next;
		while (after && length < size) {
			after = after.next;
			length++;
		}
		const first: ListNode = before.next;
		if (length % 2) {
			for (let i = 0; i < length && before; i++) before = before.next;
			continue;
		}
		let previous: ListNode | null = after;
		let node: ListNode | null = first;
		for (let i = 0; i < length && node; i++) {
			const next: ListNode | null = node.next;
			node.next = previous;
			previous = node;
			node = next;
		}
		before.next = previous;
		before = first;
	}
	return head;
};
