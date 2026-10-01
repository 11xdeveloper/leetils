import { ListNode } from "../../structures/list-node";
import { mergeTwoSortedLists } from "../0021-merge-two-sorted-lists";

/**
 * 148. Sort List
 *
 * Sorts a linked list in ascending order and returns its head. The nodes are
 * relinked, so the input list is modified.
 *
 * Bottom-up merge sort, which needs no recursion: merges runs of length 1,
 * then 2, then 4, and so on, until one run covers the whole list. Merging
 * uses the solution to Merge Two Sorted Lists.
 *
 * @see https://leetcode.com/problems/sort-list/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(1)
 *
 * @example
 * sortList(listFromArray([4, 2, 1, 3])); // 1 -> 2 -> 3 -> 4
 */
export const sortList = (head: ListNode | null): ListNode | null => {
	let length = 0;
	for (let node = head; node; node = node.next) length++;

	const dummy = new ListNode(0, head);

	/** Cuts `size` nodes off the front of `node`, returning what follows them. */
	const split = (node: ListNode | null, size: number): ListNode | null => {
		let last = node;
		for (let i = 1; i < size && last; i++) last = last.next;
		const rest = last?.next ?? null;
		if (last) last.next = null;
		return rest;
	};

	for (let size = 1; size < length; size *= 2) {
		let tail = dummy;
		let rest = dummy.next;
		while (rest) {
			const left = rest;
			const right = split(left, size);
			rest = split(right, size);

			tail.next = mergeTwoSortedLists(left, right);
			while (tail.next) tail = tail.next;
		}
	}

	return dummy.next;
};
