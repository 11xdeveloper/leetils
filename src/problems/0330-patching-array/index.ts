/**
 * 330. Patching Array
 *
 * Given sorted positive integers `nums`, returns the fewest numbers to add
 * so that every integer from 1 to `n` is the sum of some subset of the
 * array.
 *
 * Tracks `reach`: every sum from 1 to `reach - 1` is already possible. The
 * next number extends the reach if it's at most `reach`; otherwise nothing
 * can make `reach` itself, and adding `reach` is the patch that extends it
 * furthest, doubling it.
 *
 * @see https://leetcode.com/problems/patching-array/
 * @difficulty Hard
 * @timeComplexity O(m + log n) where m is the length of nums
 * @spaceComplexity O(1)
 *
 * @example
 * patchingArray([1, 5, 10], 20); // 2: add 2 and 4
 */
export const patchingArray = (nums: readonly number[], n: number): number => {
	let reach = 1;
	let patches = 0;
	let i = 0;

	while (reach <= n) {
		const num = nums[i];
		if (num !== undefined && num <= reach) {
			reach += num;
			i++;
		} else {
			reach *= 2;
			patches++;
		}
	}

	return patches;
};
