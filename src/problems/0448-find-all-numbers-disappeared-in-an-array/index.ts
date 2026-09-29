/**
 * 448. Find All Numbers Disappeared in an Array
 *
 * `nums` holds `n` numbers from 1 to `n`. Returns the numbers in that range
 * it doesn't contain, in O(n) time and without extra space (besides the
 * result), as the follow-up asks.
 *
 * Uses the array itself as a record: seeing `v` makes `nums[v - 1]`
 * negative. Positions still positive afterwards are the missing numbers.
 * The signs are restored at the end, so the array ends up as it started.
 *
 * @see https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1) excluding the returned array
 *
 * @example
 * findAllNumbersDisappearedInAnArray([4, 3, 2, 7, 8, 2, 3, 1]); // [5, 6]
 */
export const findAllNumbersDisappearedInAnArray = (
	nums: number[],
): number[] => {
	for (const num of nums) {
		const index = Math.abs(num) - 1;
		nums[index] = -Math.abs(nums[index] ?? 0);
	}

	const missing: number[] = [];
	for (const [i, num] of nums.entries()) {
		if (num > 0) missing.push(i + 1);
		nums[i] = Math.abs(num);
	}
	return missing;
};
