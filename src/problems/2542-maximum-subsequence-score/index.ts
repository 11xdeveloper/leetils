import { Heap } from "../../internal/heap";

/**
 * 2542. Maximum Subsequence Score
 *
 * Choosing `k` indices scores the sum of their `nums1` values times the
 * smallest of their `nums2` values. Returns the largest score possible.
 *
 * Go through indices by decreasing `nums2`, so each one sets the minimum,
 * and pair it with the largest `nums1` values seen so far, kept in a
 * min-heap of size `k`.
 *
 * @see https://leetcode.com/problems/maximum-subsequence-score/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * maximumSubsequenceScore([1, 3, 3, 2], [2, 1, 3, 4], 3); // 12
 */
export const maximumSubsequenceScore = (
	nums1: readonly number[],
	nums2: readonly number[],
	k: number,
): number => {
	const order = nums1
		.map((_, i) => i)
		.sort((a, b) => (nums2[b] ?? 0) - (nums2[a] ?? 0));
	const chosen = new Heap<number>((a, b) => a - b);
	let sum = 0;
	let best = 0;
	for (const i of order) {
		const value = nums1[i] ?? 0;
		chosen.push(value);
		sum += value;
		if (chosen.size > k) sum -= chosen.pop() ?? 0;
		if (chosen.size === k) best = Math.max(best, sum * (nums2[i] ?? 0));
	}
	return best;
};
