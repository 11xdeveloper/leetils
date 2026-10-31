/**
 * 3318. Find X-Sum of All K-Long Subarrays I
 *
 * An array's x-sum keeps only its `x` most frequent values (the larger
 * value wins a tie) and adds up those elements. Returns the x-sum of every
 * subarray of length `k`.
 *
 * For each window, count the values, sort by frequency then value, and add
 * up the top `x`.
 *
 * @see https://leetcode.com/problems/find-x-sum-of-all-k-long-subarrays-i/
 * @difficulty Easy
 * @timeComplexity O(n · k log k)
 * @spaceComplexity O(k)
 *
 * @example
 * findXSumOfAllKLongSubarraysI([1, 1, 2, 2, 3, 4, 2, 3], 6, 2); // [6, 10, 12]
 */
export const findXSumOfAllKLongSubarraysI = (
	nums: readonly number[],
	k: number,
	x: number,
): number[] => {
	const result: number[] = [];
	for (let start = 0; start + k <= nums.length; start++) {
		const counts = new Map<number, number>();
		for (let i = start; i < start + k; i++)
			counts.set(nums[i] ?? 0, (counts.get(nums[i] ?? 0) ?? 0) + 1);
		const top = [...counts]
			.sort((a, b) => b[1] - a[1] || b[0] - a[0])
			.slice(0, x);
		result.push(top.reduce((sum, [value, count]) => sum + value * count, 0));
	}
	return result;
};
