/**
 * 2771. Longest Non-decreasing Subarray From Two Arrays
 *
 * Building `nums3` by picking `nums1[i]` or `nums2[i]` at each index,
 * returns the length of the longest non-decreasing subarray it can have.
 *
 * Track the longest run ending at each index with either choice.
 *
 * @see https://leetcode.com/problems/longest-non-decreasing-subarray-from-two-arrays/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * longestNonDecreasingSubarrayFromTwoArrays([1, 3, 2, 1], [2, 2, 3, 4]); // 4
 */
export const longestNonDecreasingSubarrayFromTwoArrays = (
	nums1: readonly number[],
	nums2: readonly number[],
): number => {
	let run1 = 1;
	let run2 = 1;
	let best = 1;
	for (let i = 1; i < nums1.length; i++) {
		const [a, b, prevA, prevB] = [
			nums1[i] ?? 0,
			nums2[i] ?? 0,
			nums1[i - 1] ?? 0,
			nums2[i - 1] ?? 0,
		];
		const next1 = Math.max(
			1,
			a >= prevA ? run1 + 1 : 0,
			a >= prevB ? run2 + 1 : 0,
		);
		const next2 = Math.max(
			1,
			b >= prevA ? run1 + 1 : 0,
			b >= prevB ? run2 + 1 : 0,
		);
		run1 = next1;
		run2 = next2;
		best = Math.max(best, run1, run2);
	}
	return best;
};
