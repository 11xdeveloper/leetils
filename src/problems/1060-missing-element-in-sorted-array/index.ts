/**
 * 1060. Missing Element in Sorted Array
 *
 * `nums` is sorted with distinct values. Counting from `nums[0]`, returns
 * the `k`th number missing from the array.
 *
 * Before index `i`, `nums[i] - nums[0] - i` numbers are missing. Binary
 * search finds the last index with fewer than `k` missing before it; the
 * answer lies after it.
 *
 * @see https://leetcode.com/problems/missing-element-in-sorted-array/
 * @difficulty Medium
 * @timeComplexity O(log n)
 * @spaceComplexity O(1)
 *
 * @example
 * missingElementInSortedArray([4, 7, 9, 10], 3); // 8
 */
export const missingElementInSortedArray = (
	nums: readonly number[],
	k: number,
): number => {
	const first = nums[0] ?? 0;
	const missing = (i: number): number => (nums[i] ?? 0) - first - i;
	let low = 0;
	let high = nums.length - 1;
	while (low < high) {
		const mid = (low + high + 1) >>> 1;
		if (missing(mid) < k) low = mid;
		else high = mid - 1;
	}
	return (nums[low] ?? 0) + k - missing(low);
};
