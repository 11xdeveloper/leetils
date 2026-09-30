import type { ListNode } from "../../structures/list-node";

/**
 * 1019. Next Greater Node In Linked List
 *
 * For each node of the linked list, returns the value of the first later
 * node with a strictly larger value, or 0 if there's none.
 *
 * Walks the list once with a stack of positions still waiting for a larger
 * value; each node answers every smaller one on top of the stack.
 *
 * @see https://leetcode.com/problems/next-greater-node-in-linked-list/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * nextGreaterNodeInLinkedList(listFromArray([2, 7, 4, 3, 5])); // [7, 0, 5, 5, 0]
 */
export const nextGreaterNodeInLinkedList = (
	head: ListNode | null,
): number[] => {
	const answer: number[] = [];
	const waiting: [index: number, value: number][] = [];
	for (let node = head; node; node = node.next) {
		while (waiting.length > 0 && (waiting.at(-1)?.[1] ?? 0) < node.val)
			answer[waiting.pop()?.[0] ?? 0] = node.val;
		waiting.push([answer.length, node.val]);
		answer.push(0);
	}
	return answer;
};
