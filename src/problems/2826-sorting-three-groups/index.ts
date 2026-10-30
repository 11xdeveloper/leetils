/**
 * 2826. Sorting Three Groups
 *
 * Every element of `nums` is 1, 2 or 3. Returns the fewest removals that
 * leave it non-decreasing.
 *
 * Keep the longest non-decreasing subsequence: track the longest ending
 * in each value.
 *
 * @see https://leetcode.com/problems/sorting-three-groups/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * sortingThreeGroups([2, 1, 3, 2, 1]); // 3
 */
export const sortingThreeGroups = (nums: readonly number[]): number => {
	const longest = [0, 0, 0, 0];
	for (const num of nums)
		longest[num] = Math.max(...longest.slice(1, num + 1)) + 1;
	return nums.length - Math.max(...longest);
};
