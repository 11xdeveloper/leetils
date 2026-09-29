/**
 * 442. Find All Duplicates in an Array
 *
 * `nums` holds numbers from 1 to `n` (its length), each appearing once or
 * twice. Returns every number that appears twice, in O(n) time and constant
 * extra space.
 *
 * Uses the array itself as the record of what's been seen: seeing `v`
 * negates `nums[v - 1]`, so finding it already negative means `v` is a
 * repeat. The signs are restored afterwards, so the array ends up as it
 * started.
 *
 * @see https://leetcode.com/problems/find-all-duplicates-in-an-array/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1) excluding the returned array
 *
 * @example
 * findAllDuplicatesInAnArray([4, 3, 2, 7, 8, 2, 3, 1]); // [2, 3]
 */
export const findAllDuplicatesInAnArray = (nums: number[]): number[] => {
	const duplicates: number[] = [];

	for (const num of nums) {
		const value = Math.abs(num);
		const seen = nums[value - 1] ?? 0;
		if (seen < 0) duplicates.push(value);
		else nums[value - 1] = -seen;
	}

	for (const [i, num] of nums.entries()) nums[i] = Math.abs(num);
	return duplicates;
};
