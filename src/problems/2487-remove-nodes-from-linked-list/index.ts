import type { ListNode } from "../../structures/list-node";

/**
 * 2487. Remove Nodes From Linked List
 *
 * Removes every node with a strictly greater value somewhere to its right.
 *
 * Keep a stack of surviving nodes, non-increasing; a larger value pops the
 * smaller ones before it. Relink what remains.
 *
 * @see https://leetcode.com/problems/remove-nodes-from-linked-list/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * removeNodesFromLinkedList(listFromArray([5, 2, 13, 3, 8])); // 13 -> 8
 */
export const removeNodesFromLinkedList = (
	head: ListNode | null,
): ListNode | null => {
	const kept: ListNode[] = [];
	for (let node = head; node; node = node.next) {
		while (kept.length && (kept.at(-1)?.val ?? 0) < node.val) kept.pop();
		kept.push(node);
	}
	for (const [i, node] of kept.entries()) node.next = kept[i + 1] ?? null;
	return kept[0] ?? null;
};
