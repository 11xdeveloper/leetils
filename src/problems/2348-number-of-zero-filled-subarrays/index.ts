/**
 * 2348. Number of Zero-Filled Subarrays
 *
 * Counts the subarrays made only of 0s.
 *
 * A 0 ending a run of length `r` ends `r` such subarrays.
 *
 * @see https://leetcode.com/problems/number-of-zero-filled-subarrays/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * numberOfZeroFilledSubarrays([1, 3, 0, 0, 2, 0, 0, 4]); // 6
 */
export const numberOfZeroFilledSubarrays = (
	nums: readonly number[],
): number => {
	let [count, run] = [0, 0];
	for (const num of nums) {
		run = num === 0 ? run + 1 : 0;
		count += run;
	}
	return count;
};
