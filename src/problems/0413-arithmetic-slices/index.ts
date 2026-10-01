/**
 * 413. Arithmetic Slices
 *
 * Returns how many contiguous subarrays of at least three elements are
 * arithmetic: every pair of neighbours has the same difference.
 *
 * Tracks how many arithmetic slices end at each index: if the latest three
 * elements continue the pattern, that's one more than ended at the previous
 * index (each of those extended, plus the new three-element slice).
 *
 * @see https://leetcode.com/problems/arithmetic-slices/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * arithmeticSlices([1, 2, 3, 4]); // 3: [1, 2, 3], [2, 3, 4] and [1, 2, 3, 4]
 */
export const arithmeticSlices = (nums: readonly number[]): number => {
	let total = 0;
	let endingHere = 0;

	for (let i = 2; i < nums.length; i++) {
		if (
			(nums[i] ?? 0) - (nums[i - 1] ?? 0) ===
			(nums[i - 1] ?? 0) - (nums[i - 2] ?? 0)
		)
			endingHere++;
		else endingHere = 0;
		total += endingHere;
	}

	return total;
};
