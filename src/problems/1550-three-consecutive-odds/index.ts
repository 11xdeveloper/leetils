/**
 * 1550. Three Consecutive Odds
 *
 * Returns whether `arr` has three odd numbers in a row.
 *
 * Counts the current run of odd numbers.
 *
 * @see https://leetcode.com/problems/three-consecutive-odds/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * threeConsecutiveOdds([1, 2, 34, 3, 4, 5, 7, 23, 12]); // true
 */
export const threeConsecutiveOdds = (arr: readonly number[]): boolean => {
	let run = 0;
	for (const value of arr) {
		run = value % 2 === 1 ? run + 1 : 0;
		if (run === 3) return true;
	}
	return false;
};
