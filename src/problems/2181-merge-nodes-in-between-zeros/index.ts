import { ListNode } from "../../structures/list-node";

/**
 * 2181. Merge Nodes in Between Zeros
 *
 * A linked list starts and ends with 0, with 0s separating runs of
 * positive values. Returns a list of each run's sum.
 *
 * Sum each run and append a node at every 0 that closes one.
 *
 * @see https://leetcode.com/problems/merge-nodes-in-between-zeros/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1) beyond the output
 *
 * @example
 * mergeNodesInBetweenZeros(listFromArray([0, 3, 1, 0, 4, 5, 2, 0])); // 4 -> 11
 */
export const mergeNodesInBetweenZeros = (
	head: ListNode | null,
): ListNode | null => {
	const dummy = new ListNode();
	let tail = dummy;
	let sum = 0;
	for (let node = head?.next ?? null; node; node = node.next) {
		if (node.val !== 0) {
			sum += node.val;
			continue;
		}
		tail.next = new ListNode(sum);
		tail = tail.next;
		sum = 0;
	}
	return dummy.next;
};
