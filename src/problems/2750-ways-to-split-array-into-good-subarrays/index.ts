/**
 * 2750. Ways to Split Array Into Good Subarrays
 *
 * Returns the number of ways to split a binary array into subarrays that
 * each contain exactly one 1, modulo 1e9 + 7.
 *
 * Between consecutive 1s at distance `g`, the cut can go in any of `g`
 * places; multiply those together.
 *
 * @see https://leetcode.com/problems/ways-to-split-array-into-good-subarrays/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * waysToSplitArrayIntoGoodSubarrays([0, 1, 0, 0, 1]); // 3
 */
export const waysToSplitArrayIntoGoodSubarrays = (
	nums: readonly number[],
): number => {
	let ways = 0;
	let previous = -1;
	for (const [i, num] of nums.entries()) {
		if (num !== 1) continue;
		ways = previous === -1 ? 1 : (ways * (i - previous)) % 1_000_000_007;
		previous = i;
	}
	return ways;
};
