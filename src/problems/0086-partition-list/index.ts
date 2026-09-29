import { ListNode } from "../../structures/list-node";

/**
 * 86. Partition List
 *
 * Rearranges a linked list so every node with a value less than `x` comes
 * before every node with a value of at least `x`, keeping the original order
 * within each part, and returns the head. The nodes are relinked, so the
 * input list is modified.
 *
 * Builds the two parts as separate lists, then joins them.
 *
 * @see https://leetcode.com/problems/partition-list/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * partitionList(listFromArray([1, 4, 3, 2, 5, 2]), 3); // 1 -> 2 -> 2 -> 4 -> 3 -> 5
 */
export const partitionList = (
	head: ListNode | null,
	x: number,
): ListNode | null => {
	const beforeHead = new ListNode();
	const afterHead = new ListNode();
	let before = beforeHead;
	let after = afterHead;

	for (let node = head; node !== null; node = node.next) {
		if (node.val < x) {
			before.next = node;
			before = node;
		} else {
			after.next = node;
			after = node;
		}
	}

	after.next = null;
	before.next = afterHead.next;
	return beforeHead.next;
};
