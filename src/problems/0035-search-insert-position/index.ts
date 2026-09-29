/**
 * 35. Search Insert Position
 *
 * Returns the index of `target` in `nums`, which holds distinct values in
 * ascending order, or the index where it would be inserted to keep the order.
 *
 * Binary search for the first index whose value isn't less than `target`.
 *
 * @see https://leetcode.com/problems/search-insert-position/
 * @difficulty Easy
 * @timeComplexity O(log n)
 * @spaceComplexity O(1)
 *
 * @example
 * searchInsertPosition([1, 3, 5, 6], 5); // 2
 * searchInsertPosition([1, 3, 5, 6], 2); // 1
 */
export const searchInsertPosition = (
	nums: readonly number[],
	target: number,
): number => {
	let low = 0;
	let high = nums.length;

	while (low < high) {
		const mid = Math.floor((low + high) / 2);
		if ((nums[mid] ?? 0) < target) low = mid + 1;
		else high = mid;
	}

	return low;
};
