/**
 * 2770. Maximum Number of Jumps to Reach the Last Index
 *
 * From index `i` you may jump forward to any `j` with `|nums[j] -
 * nums[i]| <= target`. Returns the most jumps that reach the last index
 * from the first, or -1 if it can't be reached.
 *
 * Dynamic programming over indices, taking the best earlier index that
 * can jump to each.
 *
 * @see https://leetcode.com/problems/maximum-number-of-jumps-to-reach-the-last-index/
 * @difficulty Medium
 * @timeComplexity O(n²)
 * @spaceComplexity O(n)
 *
 * @example
 * maximumNumberOfJumpsToReachTheLastIndex([1, 3, 6, 4, 1, 2], 2); // 3
 */
export const maximumNumberOfJumpsToReachTheLastIndex = (
	nums: readonly number[],
	target: number,
): number => {
	const jumps = nums.map((_, i): number => (i === 0 ? 0 : -1));
	for (let j = 1; j < nums.length; j++)
		for (let i = 0; i < j; i++)
			if (
				(jumps[i] ?? -1) >= 0 &&
				Math.abs((nums[j] ?? 0) - (nums[i] ?? 0)) <= target
			)
				jumps[j] = Math.max(jumps[j] ?? -1, (jumps[i] ?? 0) + 1);
	return jumps.at(-1) ?? -1;
};
