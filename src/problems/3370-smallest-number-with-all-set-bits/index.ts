/**
 * 3370. Smallest Number With All Set Bits
 *
 * The smallest number at least `n` whose binary form is all 1s.
 *
 * Grow 1, 3, 7, … until reaching `n`.
 *
 * @see https://leetcode.com/problems/smallest-number-with-all-set-bits/
 * @difficulty Easy
 * @timeComplexity O(log n)
 * @spaceComplexity O(1)
 *
 * @example
 * smallestNumberWithAllSetBits(5); // 7
 */
export const smallestNumberWithAllSetBits = (n: number): number => {
	let x = 1;
	while (x < n) x = 2 * x + 1;
	return x;
};
