/**
 * 75. Sort Colors
 *
 * Sorts an array of 0s, 1s and 2s (red, white and blue) in place, as the
 * problem requires, in a single pass and without a library sort.
 *
 * Dijkstra's Dutch national flag partition: 0s are swapped to a growing
 * region at the front, 2s to a growing region at the back, and 1s are left
 * in the middle.
 *
 * @see https://leetcode.com/problems/sort-colors/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * const nums = [2, 0, 2, 1, 1, 0];
 * sortColors(nums); // nums is now [0, 0, 1, 1, 2, 2]
 */
export const sortColors = (nums: number[]): void => {
	const swap = (i: number, j: number): void => {
		const temp = nums[i] ?? 0;
		nums[i] = nums[j] ?? 0;
		nums[j] = temp;
	};

	let low = 0;
	let mid = 0;
	let high = nums.length - 1;

	while (mid <= high) {
		if (nums[mid] === 0) {
			swap(low, mid);
			low++;
			mid++;
		} else if (nums[mid] === 2) {
			// The value swapped in from the back hasn't been checked yet.
			swap(mid, high);
			high--;
		} else {
			mid++;
		}
	}
};
