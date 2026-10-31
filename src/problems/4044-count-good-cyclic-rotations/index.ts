/**
 * 4044. Count Good Cyclic Rotations
 *
 * Counts the rotations of `nums` (even length) whose first half sums to
 * more than the second half.
 *
 * Slide a window of n / 2 over the array read twice.
 *
 * @see https://leetcode.com/problems/count-good-cyclic-rotations/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * countGoodCyclicRotations([1, 2, 3, 4, 5, 6]); // 3
 */
export const countGoodCyclicRotations = (nums: readonly number[]): number => {
	const n = nums.length;
	const half = n / 2;
	const total = nums.reduce((a, b) => a + b, 0);
	let window = 0;
	for (let i = 0; i < half; i++) window += nums[i] ?? 0;
	let count = 0;
	for (let r = 0; r < n; r++) {
		if (2 * window > total) count++;
		window += (nums[(r + half) % n] ?? 0) - (nums[r] ?? 0);
	}
	return count;
};
