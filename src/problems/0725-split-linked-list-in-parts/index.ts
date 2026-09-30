import type { ListNode } from "../../structures/list-node";

/**
 * 725. Split Linked List in Parts
 *
 * Splits a linked list into `k` consecutive parts whose lengths differ by
 * at most one, longer parts first. Parts past the end of a short list are
 * `null`. The list is cut in place.
 *
 * With length `n`, every part has `⌊n / k⌋` nodes and the first `n mod k`
 * one more. It walks the list once to count, then again to cut.
 *
 * @see https://leetcode.com/problems/split-linked-list-in-parts/
 * @difficulty Medium
 * @timeComplexity O(n + k)
 * @spaceComplexity O(k) for the result
 *
 * @example
 * splitLinkedListInParts(listFromArray([1, 2, 3]), 5); // the lists [1], [2], [3], then two nulls
 */
export const splitLinkedListInParts = (
	head: ListNode | null,
	k: number,
): (ListNode | null)[] => {
	let length = 0;
	for (let node = head; node; node = node.next) length++;

	const parts: (ListNode | null)[] = [];
	let node = head;
	for (let part = 0; part < k; part++) {
		parts.push(node);
		const size = Math.floor(length / k) + (part < length % k ? 1 : 0);
		for (let i = 1; i < size && node; i++) node = node.next;
		if (node && size > 0) {
			const next: ListNode | null = node.next;
			node.next = null;
			node = next;
		}
	}
	return parts;
};
