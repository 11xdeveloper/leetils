/**
 * 283. Move Zeroes
 *
 * Moves every 0 in `nums` to the end, in place, as the problem requires,
 * keeping the other values in their original order.
 *
 * Swaps each non-zero value forward to the next write position, which
 * leaves the zeros behind it. Each value is moved at most once.
 *
 * @see https://leetcode.com/problems/move-zeroes/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * const nums = [0, 1, 0, 3, 12];
 * moveZeroes(nums); // nums is now [1, 3, 12, 0, 0]
 */
export const moveZeroes = (nums: number[]): void => {
	let write = 0;
	for (const [i, num] of nums.entries()) {
		if (num === 0) continue;
		nums[i] = nums[write] ?? 0;
		nums[write] = num;
		write++;
	}
};
