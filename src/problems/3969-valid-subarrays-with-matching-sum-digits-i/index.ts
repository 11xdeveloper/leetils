/**
 * 3969. Valid Subarrays With Matching Sum Digits I
 *
 * Counts the subarrays whose sum starts and ends with the digit `x`.
 *
 * Check every subarray's sum.
 *
 * @see https://leetcode.com/problems/valid-subarrays-with-matching-sum-digits-i/
 * @difficulty Medium
 * @timeComplexity O(n² log S)
 * @spaceComplexity O(1)
 *
 * @example
 * validSubarraysWithMatchingSumDigitsI([1, 100, 1], 1); // 4
 */
export const validSubarraysWithMatchingSumDigitsI = (
	nums: readonly number[],
	x: number,
): number => {
	let count = 0;
	for (let i = 0; i < nums.length; i++) {
		let sum = 0;
		for (let j = i; j < nums.length; j++) {
			sum += nums[j] ?? 0;
			if (sum % 10 !== x) continue;
			let first = sum;
			while (first >= 10) first = Math.floor(first / 10);
			if (first === x) count++;
		}
	}
	return count;
};
