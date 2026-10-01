/**
 * 137. Single Number II
 *
 * Every value in `nums` appears three times except one, which appears once.
 * Returns that one.
 *
 * Counts, for every bit position at once, how many times it's been set,
 * modulo 3, using two bitmasks as a two-bit counter: `ones` holds the bits
 * seen once, `twos` the bits seen twice, and a third sighting clears both.
 * The bits left in `ones` belong to the single value. JavaScript's bitwise
 * operators work on 32-bit integers, which fits the problem's range.
 *
 * @see https://leetcode.com/problems/single-number-ii/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * singleNumberII([0, 1, 0, 1, 0, 1, 99]); // 99
 */
export const singleNumberII = (nums: readonly number[]): number => {
	let ones = 0;
	let twos = 0;

	for (const num of nums) {
		ones = (ones ^ num) & ~twos;
		twos = (twos ^ num) & ~ones;
	}

	return ones;
};
