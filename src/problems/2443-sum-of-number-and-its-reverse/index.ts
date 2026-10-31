/**
 * 2443. Sum of Number and Its Reverse
 *
 * Returns whether `num` is some non-negative `k` plus its digit reversal.
 *
 * Try every `k` up to `num` (at most 10^5).
 *
 * @see https://leetcode.com/problems/sum-of-number-and-its-reverse/
 * @difficulty Medium
 * @timeComplexity O(num log num)
 * @spaceComplexity O(1)
 *
 * @example
 * sumOfNumberAndItsReverse(443); // true
 */
export const sumOfNumberAndItsReverse = (num: number): boolean => {
	for (let k = 0; k <= num; k++) {
		let reversed = 0;
		for (let rest = k; rest > 0; rest = Math.floor(rest / 10))
			reversed = reversed * 10 + (rest % 10);
		if (k + reversed === num) return true;
	}
	return false;
};
