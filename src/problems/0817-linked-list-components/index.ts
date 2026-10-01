import type { ListNode } from "../../structures/list-node";

/**
 * 817. Linked List Components
 *
 * `head` is a linked list of distinct values, and `nums` a subset of them.
 * Returns how many connected components `nums` forms: maximal runs of
 * consecutive list nodes whose values are all in `nums`.
 *
 * Counts the nodes in `nums` whose next node isn't, since each such node
 * ends one component.
 *
 * @see https://leetcode.com/problems/linked-list-components/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(|nums|)
 *
 * @example
 * linkedListComponents(listFromArray([0, 1, 2, 3]), [0, 1, 3]); // 2
 */
export const linkedListComponents = (
	head: ListNode | null,
	nums: readonly number[],
): number => {
	const wanted = new Set(nums);
	let components = 0;
	for (let node = head; node; node = node.next) {
		if (wanted.has(node.val) && !(node.next && wanted.has(node.next.val)))
			components++;
	}
	return components;
};
