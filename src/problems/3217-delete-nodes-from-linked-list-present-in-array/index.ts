import { ListNode } from "../../structures/list-node";

/**
 * 3217. Delete Nodes From Linked List Present in Array
 *
 * Remove every node whose value is in `nums` from the list.
 *
 * Put `nums` in a set and unlink matching nodes behind a dummy head.
 *
 * @see https://leetcode.com/problems/delete-nodes-from-linked-list-present-in-array/
 * @difficulty Medium
 * @timeComplexity O(n + m)
 * @spaceComplexity O(m)
 *
 * @example
 * listToArray(deleteNodesFromLinkedListPresentInArray([1, 2, 3], listFromArray([1, 2, 3, 4, 5]))); // [4, 5]
 */
export const deleteNodesFromLinkedListPresentInArray = (
	nums: readonly number[],
	head: ListNode | null,
): ListNode | null => {
	const remove = new Set(nums);
	const dummy = new ListNode(0, head);
	for (let node = dummy; node.next; )
		if (remove.has(node.next.val)) node.next = node.next.next;
		else node = node.next;
	return dummy.next;
};
