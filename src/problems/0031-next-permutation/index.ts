const swap = (nums: number[], i: number, j: number): void => {
	const temp = nums[i] ?? 0;
	nums[i] = nums[j] ?? 0;
	nums[j] = temp;
};

/**
 * 31. Next Permutation
 *
 * Rearranges `nums` in place into the next permutation in lexicographic
 * order, as the problem requires. The last permutation wraps around to the
 * first, which is ascending order.
 *
 * Finds the rightmost element smaller than the one after it (the pivot), swaps
 * it with the rightmost element larger than it, then reverses everything after
 * the pivot's position, which turns that descending run into ascending order.
 *
 * @see https://leetcode.com/problems/next-permutation/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * const nums = [1, 2, 3];
 * nextPermutation(nums); // nums is now [1, 3, 2]
 */
export const nextPermutation = (nums: number[]): void => {
	let pivot = nums.length - 2;
	while (pivot >= 0 && (nums[pivot] ?? 0) >= (nums[pivot + 1] ?? 0)) pivot--;

	if (pivot >= 0) {
		let successor = nums.length - 1;
		while ((nums[successor] ?? 0) <= (nums[pivot] ?? 0)) successor--;
		swap(nums, pivot, successor);
	}

	for (let i = pivot + 1, j = nums.length - 1; i < j; i++, j--) {
		swap(nums, i, j);
	}
};
