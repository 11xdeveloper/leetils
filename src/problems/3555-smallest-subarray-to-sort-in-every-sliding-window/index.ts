/**
 * 3555. Smallest Subarray to Sort in Every Sliding Window
 *
 * For every window of `k` elements, the length of the shortest subarray of
 * it that, once sorted, sorts the whole window.
 *
 * In a window, the part to sort runs from the first element bigger than
 * something after it to the last element smaller than something before
 * it; find both with a pass from each end.
 *
 * @see https://leetcode.com/problems/smallest-subarray-to-sort-in-every-sliding-window/
 * @difficulty Medium
 * @timeComplexity O(n · k)
 * @spaceComplexity O(1)
 *
 * @example
 * smallestSubarrayToSortInEverySlidingWindow([1, 3, 2, 4, 5], 3); // [2, 2, 0]
 */
export const smallestSubarrayToSortInEverySlidingWindow = (
	nums: readonly number[],
	k: number,
): number[] => {
	const result: number[] = [];
	for (let start = 0; start + k <= nums.length; start++) {
		let right = -1;
		for (let i = start, max = Number.NEGATIVE_INFINITY; i < start + k; i++) {
			if ((nums[i] ?? 0) < max) right = i;
			max = Math.max(max, nums[i] ?? 0);
		}
		let left = -1;
		for (
			let i = start + k - 1, min = Number.POSITIVE_INFINITY;
			i >= start;
			i--
		) {
			if ((nums[i] ?? 0) > min) left = i;
			min = Math.min(min, nums[i] ?? 0);
		}
		result.push(right === -1 ? 0 : right - left + 1);
	}
	return result;
};
