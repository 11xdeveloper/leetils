import { ListNode } from "../../structures/list-node";

/**
 * 19. Remove Nth Node From End of List
 *
 * Removes the `n`th node from the end of the list and returns its head.
 * Modifies the list in place.
 *
 * Moves a leading pointer `n + 1` nodes ahead of a trailing one, starting from
 * a dummy node before the head. When the leading pointer runs off the end,
 * the trailing one is just before the node to remove, all in one pass.
 *
 * @see https://leetcode.com/problems/remove-nth-node-from-end-of-list/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * removeNthNodeFromEndOfList(listFromArray([1, 2, 3, 4, 5]), 2); // 1 -> 2 -> 3 -> 5
 */
export const removeNthNodeFromEndOfList = (
	head: ListNode | null,
	n: number,
): ListNode | null => {
	const dummy = new ListNode(0, head);
	let leading: ListNode | null = dummy;
	let trailing = dummy;

	for (let i = 0; i <= n; i++) leading = leading?.next ?? null;

	while (leading !== null && trailing.next !== null) {
		leading = leading.next;
		trailing = trailing.next;
	}

	trailing.next = trailing.next?.next ?? null;
	return dummy.next;
};
