/**
 * 845. Longest Mountain in Array
 *
 * Returns the length of the longest subarray that strictly rises then
 * strictly falls (at least one step each way), or 0 if there's none.
 *
 * One pass over the array: from each potential base, climbs while rising
 * and then descends while falling, measuring the mountain if both parts
 * were non-empty, and continues from where it stopped.
 *
 * @see https://leetcode.com/problems/longest-mountain-in-array/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * longestMountainInArray([2, 1, 4, 7, 3, 2, 5]); // 5: [1, 4, 7, 3, 2]
 */
export const longestMountainInArray = (arr: readonly number[]): number => {
	let longest = 0;
	let base = 0;
	while (base < arr.length) {
		let end = base;
		while (end + 1 < arr.length && (arr[end] ?? 0) < (arr[end + 1] ?? 0)) end++;
		const peak = end;
		while (end + 1 < arr.length && (arr[end] ?? 0) > (arr[end + 1] ?? 0)) end++;
		if (peak > base && end > peak) longest = Math.max(longest, end - base + 1);
		base = Math.max(end, base + 1);
	}
	return longest;
};
