import { ListNode } from "../../structures/list-node";

/**
 * 3063. Linked List Frequency
 *
 * A list of how often each distinct value appears in the given list, in the
 * order the values first appear.
 *
 * Count with a map, which keeps insertion order, then build the list.
 *
 * @see https://leetcode.com/problems/linked-list-frequency/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * listToArray(linkedListFrequency(listFromArray([1, 1, 2, 1, 2, 3]))); // [3, 2, 1]
 */
export const linkedListFrequency = (head: ListNode | null): ListNode | null => {
	const counts = new Map<number, number>();
	for (let node = head; node; node = node.next)
		counts.set(node.val, (counts.get(node.val) ?? 0) + 1);
	const dummy = new ListNode();
	let tail = dummy;
	for (const count of counts.values()) {
		tail.next = new ListNode(count);
		tail = tail.next;
	}
	return dummy.next;
};
