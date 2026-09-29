import { ListNode } from "../../structures/list-node";

/**
 * 147. Insertion Sort List
 *
 * Sorts a linked list in ascending order using insertion sort, and returns
 * its head. The nodes are relinked, so the input list is modified.
 *
 * Moves each node, in turn, into its place in a growing sorted list behind a
 * dummy node. Nodes already in order are left where they are, so a sorted
 * list takes a single pass.
 *
 * @see https://leetcode.com/problems/insertion-sort-list/
 * @difficulty Medium
 * @timeComplexity O(n^2)
 * @spaceComplexity O(1)
 *
 * @example
 * insertionSortList(listFromArray([4, 2, 1, 3])); // 1 -> 2 -> 3 -> 4
 */
export const insertionSortList = (head: ListNode | null): ListNode | null => {
	const dummy = new ListNode(0, head);
	let lastSorted = head;

	while (lastSorted?.next) {
		const node: ListNode = lastSorted.next;
		if (node.val >= lastSorted.val) {
			lastSorted = node;
			continue;
		}

		lastSorted.next = node.next;
		let before = dummy;
		while (before.next && before.next.val <= node.val) before = before.next;
		node.next = before.next;
		before.next = node;
	}

	return dummy.next;
};
