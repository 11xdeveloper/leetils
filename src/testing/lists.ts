import { type ListNode, listFromArray } from "../structures/list-node";

/**
 * Builds a list like LeetCode's cycle problems: the tail links back to the
 * node at index `pos`, or to nothing when `pos` is -1.
 */
export const listWithCycle = (
	values: readonly number[],
	pos: number,
): { head: ListNode | null; entry: ListNode | null } => {
	const head = listFromArray(values);
	let tail = head;
	let entry: ListNode | null = null;
	for (let i = 0; tail; i++) {
		if (i === pos) entry = tail;
		if (!tail.next) break;
		tail = tail.next;
	}
	if (tail && entry) tail.next = entry;
	return { head, entry };
};
