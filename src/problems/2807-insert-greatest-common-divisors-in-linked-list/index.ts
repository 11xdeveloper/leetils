import { ListNode } from "../../structures/list-node";

/**
 * 2807. Insert Greatest Common Divisors in Linked List
 *
 * Between every pair of adjacent nodes, inserts a node holding their
 * greatest common divisor. Returns the head.
 *
 * Walk the list, splicing in a new node after each one that has a
 * successor.
 *
 * @see https://leetcode.com/problems/insert-greatest-common-divisors-in-linked-list/
 * @difficulty Medium
 * @timeComplexity O(n log m), where `m` is the largest value
 * @spaceComplexity O(1) beyond the new nodes
 *
 * @example
 * listToArray(insertGreatestCommonDivisorsInLinkedList(listFromArray([18, 6, 10, 3]))); // [18, 6, 6, 2, 10, 1, 3]
 */
export const insertGreatestCommonDivisorsInLinkedList = (
	head: ListNode | null,
): ListNode | null => {
	const gcd = (a: number, b: number): number => {
		while (b) [a, b] = [b, a % b];
		return a;
	};
	for (let node = head; node?.next; node = node.next.next) {
		node.next = new ListNode(gcd(node.val, node.next.val), node.next);
	}
	return head;
};
