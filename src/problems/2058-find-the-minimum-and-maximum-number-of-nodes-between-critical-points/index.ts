import type { ListNode } from "../../structures/list-node";

/**
 * 2058. Find the Minimum and Maximum Number of Nodes Between Critical Points
 *
 * A critical point is a node that is a strict local maximum or minimum of
 * the linked list. Returns the smallest and largest distance between two
 * critical points, or `[-1, -1]` if there are fewer than two.
 *
 * The largest is from the first to the last; the smallest is between
 * neighbouring ones.
 *
 * @see https://leetcode.com/problems/find-the-minimum-and-maximum-number-of-nodes-between-critical-points/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * findTheMinimumAndMaximumNumberOfNodesBetweenCriticalPoints(listFromArray([5, 3, 1, 2, 5, 1, 2])); // [1, 3]
 */
export const findTheMinimumAndMaximumNumberOfNodesBetweenCriticalPoints = (
	head: ListNode | null,
): number[] => {
	let [first, last, closest] = [-1, -1, Infinity];
	let previous = head;
	for (
		let node = head?.next ?? null, index = 1;
		previous && node?.next;
		previous = node, node = node.next, index++
	) {
		const next = node.next.val;
		const critical =
			(node.val > previous.val && node.val > next) ||
			(node.val < previous.val && node.val < next);
		if (!critical) continue;
		if (first === -1) first = index;
		else closest = Math.min(closest, index - last);
		last = index;
	}
	return closest === Infinity ? [-1, -1] : [closest, last - first];
};
