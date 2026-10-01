import { ListNode } from "../../structures/list-node";

/**
 * 708. Insert into a Sorted Circular Linked List
 *
 * Inserts `insertVal` into a circular linked list sorted in non-descending
 * order, keeping it sorted, given a reference to any node. Returns that
 * same node, or a new one-node circular list if the list was empty. The
 * list is modified in place.
 *
 * Walks round the circle looking for a gap `node → node.next` where the
 * value fits: between two values, or at the wrap-around point from the
 * largest back to the smallest if it's beyond either end. If a full circle
 * finds neither (every value is equal), anywhere works.
 *
 * @see https://leetcode.com/problems/insert-into-a-sorted-circular-linked-list/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * insertIntoASortedCircularLinkedList(head, 2); // for 3 → 4 → 1 → (3), gives 3 → 4 → 1 → 2 → (3)
 */
export const insertIntoASortedCircularLinkedList = (
	head: ListNode | null,
	insertVal: number,
): ListNode | null => {
	if (!head) {
		const node = new ListNode(insertVal);
		node.next = node;
		return node;
	}

	let node = head;
	for (;;) {
		const next: ListNode = node.next ?? head;
		const fitsBetween = node.val <= insertVal && insertVal <= next.val;
		const atWrap =
			node.val > next.val && (insertVal >= node.val || insertVal <= next.val);
		if (fitsBetween || atWrap || next === head) {
			node.next = new ListNode(insertVal, next);
			return head;
		}
		node = next;
	}
};
