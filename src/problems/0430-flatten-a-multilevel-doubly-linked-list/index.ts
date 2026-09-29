import type { MultilevelListNode } from "../../structures/multilevel-list-node";

/**
 * 430. Flatten a Multilevel Doubly Linked List
 *
 * Flattens a doubly linked list whose nodes may have child lists (which may
 * have children of their own) into one level, in place: each child list is
 * spliced in right after its parent node, before the parent's next node.
 * Every `child` pointer ends up `null`. Returns the head.
 *
 * Walks the list once. At a node with a child, it splices the whole child
 * list in after the node, attaching the child list's tail to the node's old
 * next. The walk then continues into the spliced list, so deeper children
 * are handled as they're reached, without recursion.
 *
 * @see https://leetcode.com/problems/flatten-a-multilevel-doubly-linked-list/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * flattenAMultilevelDoublyLinkedList(multilevelListFromArray([1, 2, null, 3])); // 1 ⇄ 3 ⇄ 2
 */
export const flattenAMultilevelDoublyLinkedList = (
	head: MultilevelListNode | null,
): MultilevelListNode | null => {
	for (let node = head; node; node = node.next) {
		const child = node.child;
		if (!child) continue;

		let tail = child;
		while (tail.next) tail = tail.next;

		tail.next = node.next;
		if (node.next) node.next.prev = tail;
		node.next = child;
		child.prev = node;
		node.child = null;
	}

	return head;
};
