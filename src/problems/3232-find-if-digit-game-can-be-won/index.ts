/**
 * 3232. Find if Digit Game Can Be Won
 *
 * Alice takes either all the single-digit numbers or all the double-digit
 * ones, and Bob gets the rest. Returns whether Alice can end up with a
 * strictly bigger sum.
 *
 * She wins unless the two groups' sums are equal.
 *
 * @see https://leetcode.com/problems/find-if-digit-game-can-be-won/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * findIfDigitGameCanBeWon([1, 2, 3, 4, 5, 14]); // true
 */
export const findIfDigitGameCanBeWon = (nums: readonly number[]): boolean => {
	let balance = 0;
	for (const num of nums) balance += num < 10 ? num : -num;
	return balance !== 0;
};
