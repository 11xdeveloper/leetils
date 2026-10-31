/**
 * 3804. Number of Centered Subarrays
 *
 * Counts the subarrays whose sum equals one of their own elements.
 *
 * Extend from every start, keeping the running sum and the values seen.
 *
 * @see https://leetcode.com/problems/number-of-centered-subarrays/
 * @difficulty Medium
 * @timeComplexity O(n²)
 * @spaceComplexity O(n)
 *
 * @example
 * numberOfCenteredSubarrays([-1, 1, 0]); // 5
 */
export const numberOfCenteredSubarrays = (nums: readonly number[]): number => {
	let count = 0;
	for (let i = 0; i < nums.length; i++) {
		const values = new Set<number>();
		let sum = 0;
		for (let j = i; j < nums.length; j++) {
			sum += nums[j] ?? 0;
			values.add(nums[j] ?? 0);
			if (values.has(sum)) count++;
		}
	}
	return count;
};
