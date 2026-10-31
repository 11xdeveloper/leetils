/**
 * 3818. Minimum Prefix Removal to Make Array Strictly Increasing
 *
 * The shortest prefix to remove so that what's left strictly increases:
 * everything before the longest strictly increasing suffix.
 *
 * @see https://leetcode.com/problems/minimum-prefix-removal-to-make-array-strictly-increasing/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * minimumPrefixRemovalToMakeArrayStrictlyIncreasing([1, -1, 2, 3, 3, 4, 5]); // 4
 */
export const minimumPrefixRemovalToMakeArrayStrictlyIncreasing = (
	nums: readonly number[],
): number => {
	let start = nums.length - 1;
	while (start > 0 && (nums[start - 1] ?? 0) < (nums[start] ?? 0)) start--;
	return start;
};
