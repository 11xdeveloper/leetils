/**
 * 2544. Alternating Digit Sum
 *
 * Returns the sum of `n`'s digits with alternating signs, starting with a
 * plus on the most significant digit.
 *
 * Walk the digits from the most significant end, flipping the sign each
 * time.
 *
 * @see https://leetcode.com/problems/alternating-digit-sum/
 * @difficulty Easy
 * @timeComplexity O(log n)
 * @spaceComplexity O(1)
 *
 * @example
 * alternatingDigitSum(521); // 4
 */
export const alternatingDigitSum = (n: number): number => {
	const digits = String(n);
	let sum = 0;
	for (let i = 0; i < digits.length; i++)
		sum += (i % 2 === 0 ? 1 : -1) * (digits.charCodeAt(i) - 48);
	return sum;
};
