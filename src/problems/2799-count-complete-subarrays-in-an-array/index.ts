/**
 * 2799. Count Complete Subarrays in an Array
 *
 * A subarray is complete if it has as many distinct values as the whole
 * array. Returns the number of complete subarrays.
 *
 * For each right end, shrink the window from the left while it stays
 * complete; every start before the window's left edge works too.
 *
 * @see https://leetcode.com/problems/count-complete-subarrays-in-an-array/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * countCompleteSubarraysInAnArray([1, 3, 1, 2, 2]); // 4
 */
export const countCompleteSubarraysInAnArray = (
	nums: readonly number[],
): number => {
	const distinct = new Set(nums).size;
	const counts = new Map<number, number>();
	let left = 0;
	let complete = 0;
	for (const num of nums) {
		counts.set(num, (counts.get(num) ?? 0) + 1);
		for (;;) {
			const first = nums[left] ?? 0;
			const count = counts.get(first) ?? 0;
			if (count === 1 || counts.size < distinct) break;
			counts.set(first, count - 1);
			left++;
		}
		if (counts.size === distinct) complete += left + 1;
	}
	return complete;
};
