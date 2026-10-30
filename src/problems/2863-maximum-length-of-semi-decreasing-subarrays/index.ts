/**
 * 2863. Maximum Length of Semi-Decreasing Subarrays
 *
 * A subarray is semi-decreasing if its first element is strictly greater
 * than its last. Returns the length of the longest one, or 0.
 *
 * Visit indices from the largest value down, a value at a time; each
 * index can end a subarray starting at the leftmost index seen with a
 * strictly larger value.
 *
 * @see https://leetcode.com/problems/maximum-length-of-semi-decreasing-subarrays/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * maximumLengthOfSemiDecreasingSubarrays([7, 6, 5, 4, 3, 2, 1, 6, 10, 11]); // 8
 */
export const maximumLengthOfSemiDecreasingSubarrays = (
	nums: readonly number[],
): number => {
	const order = nums
		.map((_, i) => i)
		.sort((a, b) => (nums[b] ?? 0) - (nums[a] ?? 0));
	let leftmost = Number.POSITIVE_INFINITY;
	let best = 0;
	for (let i = 0; i < order.length; ) {
		let j = i;
		while (j < order.length && nums[order[j] ?? 0] === nums[order[i] ?? 0]) j++;
		const group = order.slice(i, j);
		for (const index of group) best = Math.max(best, index - leftmost + 1);
		for (const index of group) leftmost = Math.min(leftmost, index);
		i = j;
	}
	return best;
};
