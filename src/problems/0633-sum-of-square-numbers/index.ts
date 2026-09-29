/**
 * 633. Sum of Square Numbers
 *
 * Returns whether the non-negative integer `c` is `a² + b²` for some
 * integers `a` and `b`.
 *
 * Two pointers: `a` from 0 up and `b` from `⌊√c⌋` down. A sum that's too
 * small needs a larger `a`; one that's too large needs a smaller `b`.
 *
 * @see https://leetcode.com/problems/sum-of-square-numbers/
 * @difficulty Medium
 * @timeComplexity O(√c)
 * @spaceComplexity O(1)
 *
 * @example
 * sumOfSquareNumbers(5); // true: 1² + 2²
 */
export const sumOfSquareNumbers = (c: number): boolean => {
	for (let a = 0, b = Math.floor(Math.sqrt(c)); a <= b; ) {
		const sum = a * a + b * b;
		if (sum === c) return true;
		if (sum < c) a++;
		else b--;
	}
	return false;
};
