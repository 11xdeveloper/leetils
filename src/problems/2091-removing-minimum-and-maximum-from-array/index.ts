/**
 * 2091. Removing Minimum and Maximum From Array
 *
 * A deletion removes the first or last element of an array of distinct
 * numbers. Returns the fewest deletions that remove both its minimum and
 * maximum.
 *
 * With the two at indices `i ≤ j`: delete both from the front, both from
 * the back, or `i` from the front and `j` from the back.
 *
 * @see https://leetcode.com/problems/removing-minimum-and-maximum-from-array/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * removingMinimumAndMaximumFromArray([2, 10, 7, 5, 4, 1, 8, 6]); // 5
 */
export const removingMinimumAndMaximumFromArray = (
	nums: readonly number[],
): number => {
	const n = nums.length;
	let [low, high] = [0, 0];
	for (const [index, num] of nums.entries()) {
		if (num < (nums[low] ?? 0)) low = index;
		if (num > (nums[high] ?? 0)) high = index;
	}
	const [i, j] = low < high ? [low, high] : [high, low];
	return Math.min(j + 1, n - i, i + 1 + n - j);
};
