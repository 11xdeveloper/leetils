/**
 * 2576. Find the Maximum Number of Marked Indices
 *
 * An operation marks two unmarked indices `i` and `j` with `2 ·
 * nums[i] <= nums[j]`. Returns the most indices that can be marked.
 *
 * At most half the elements can be the smaller of a pair, and the best
 * candidates are the smallest half. Once sorted, match the smallest half
 * against the larger half in order with two pointers.
 *
 * @see https://leetcode.com/problems/find-the-maximum-number-of-marked-indices/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * findTheMaximumNumberOfMarkedIndices([9, 2, 5, 4]); // 4
 */
export const findTheMaximumNumberOfMarkedIndices = (
	nums: readonly number[],
): number => {
	const sorted = nums.toSorted((a, b) => a - b);
	const n = sorted.length;
	let small = 0;
	for (
		let large = Math.ceil(n / 2);
		large < n && small < Math.floor(n / 2);
		large++
	)
		if (2 * (sorted[small] ?? 0) <= (sorted[large] ?? 0)) small++;
	return 2 * small;
};
