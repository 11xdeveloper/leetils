/**
 * 3833. Count Dominant Indices
 *
 * Counts the indices whose element is greater than the average of the
 * elements after it (the last index never counts).
 *
 * @see https://leetcode.com/problems/count-dominant-indices/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * countDominantIndices([5, 4, 3]); // 2
 */
export const countDominantIndices = (nums: readonly number[]): number => {
	let [count, suffix] = [0, 0];
	for (let i = nums.length - 1; i >= 0; i--) {
		const after = nums.length - 1 - i;
		if (after > 0 && (nums[i] ?? 0) * after > suffix) count++;
		suffix += nums[i] ?? 0;
	}
	return count;
};
