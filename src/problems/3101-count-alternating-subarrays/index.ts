/**
 * 3101. Count Alternating Subarrays
 *
 * Count the subarrays of the binary array `nums` with no two neighbours
 * equal.
 *
 * Track the length of the alternating run ending at each index; that many
 * alternating subarrays end there.
 *
 * @see https://leetcode.com/problems/count-alternating-subarrays/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * countAlternatingSubarrays([0, 1, 1, 1]); // 5
 */
export const countAlternatingSubarrays = (nums: readonly number[]): number => {
	let total = 0;
	let run = 0;
	nums.forEach((num, i) => {
		run = i > 0 && nums[i - 1] !== num ? run + 1 : 1;
		total += run;
	});
	return total;
};
