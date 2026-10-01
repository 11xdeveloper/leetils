import type { ListNode } from "../../structures/list-node";
import { mergeTwoSortedLists } from "../0021-merge-two-sorted-lists";

/**
 * 23. Merge k Sorted Lists
 *
 * Merges `k` sorted linked lists into one sorted list and returns its head.
 * The result reuses the input nodes, so the input lists are modified.
 *
 * Merges the lists in pairs, halving their number each round, using the
 * solution to Merge Two Sorted Lists. Each node takes part in about log k
 * merges, instead of up to k when merging the lists one after another.
 *
 * @see https://leetcode.com/problems/merge-k-sorted-lists/
 * @difficulty Hard
 * @timeComplexity O(N log k) where N is the total number of nodes
 * @spaceComplexity O(k)
 *
 * @example
 * mergeKSortedLists([
 *   listFromArray([1, 4, 5]),
 *   listFromArray([1, 3, 4]),
 *   listFromArray([2, 6]),
 * ]); // 1 -> 1 -> 2 -> 3 -> 4 -> 4 -> 5 -> 6
 */
export const mergeKSortedLists = (
	lists: readonly (ListNode | null)[],
): ListNode | null => {
	let remaining = lists;

	while (remaining.length > 1) {
		const merged: (ListNode | null)[] = [];
		for (let i = 0; i < remaining.length; i += 2) {
			merged.push(
				mergeTwoSortedLists(remaining[i] ?? null, remaining[i + 1] ?? null),
			);
		}
		remaining = merged;
	}

	return remaining[0] ?? null;
};
