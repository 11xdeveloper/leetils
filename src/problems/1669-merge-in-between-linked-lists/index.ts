import type { ListNode } from "../../structures/list-node";

/**
 * 1669. Merge In Between Linked Lists
 *
 * Replaces the nodes at indices `a … b` of `list1` with all of `list2`
 * and returns the head of `list1`.
 *
 * Find the node just before index `a` and the one just after `b`, then
 * splice `list2` between them.
 *
 * @see https://leetcode.com/problems/merge-in-between-linked-lists/
 * @difficulty Medium
 * @timeComplexity O(n + m)
 * @spaceComplexity O(1)
 *
 * @example
 * listToArray(mergeInBetweenLinkedLists(listFromArray([10, 1, 13, 6, 9, 5]), 3, 4, listFromArray([1000000, 1000001, 1000002]))); // [10, 1, 13, 1000000, 1000001, 1000002, 5]
 */
export const mergeInBetweenLinkedLists = (
	list1: ListNode | null,
	a: number,
	b: number,
	list2: ListNode | null,
): ListNode | null => {
	let before = list1;
	for (let i = 1; i < a && before; i++) before = before.next;
	let after = before;
	for (let i = a; i <= b && after; i++) after = after.next;
	after = after?.next ?? null;
	let tail = list2;
	while (tail?.next) tail = tail.next;
	if (before) before.next = list2 ?? after;
	if (tail) tail.next = after;
	return list1;
};
