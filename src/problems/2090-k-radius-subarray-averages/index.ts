/**
 * 2090. K Radius Subarray Averages
 *
 * Returns, for each index, the average (rounded down) of the elements
 * within `k` of it, or -1 where fewer than `k` lie on either side.
 *
 * Slide a window of `2k + 1` elements, keeping its sum.
 *
 * @see https://leetcode.com/problems/k-radius-subarray-averages/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1) beyond the output
 *
 * @example
 * kRadiusSubarrayAverages([7, 4, 3, 9, 1, 8, 5, 2, 6], 3); // [-1, -1, -1, 5, 4, 4, -1, -1, -1]
 */
export const kRadiusSubarrayAverages = (
	nums: readonly number[],
	k: number,
): number[] => {
	const width = 2 * k + 1;
	const averages = new Array<number>(nums.length).fill(-1);
	let sum = 0;
	for (const [i, num] of nums.entries()) {
		sum += num;
		if (i >= width) sum -= nums[i - width] ?? 0;
		if (i >= width - 1) averages[i - k] = Math.floor(sum / width);
	}
	return averages;
};
