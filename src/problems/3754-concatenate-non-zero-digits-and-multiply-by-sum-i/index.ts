/**
 * 3754. Concatenate Non-Zero Digits and Multiply by Sum I
 *
 * Join the non-zero digits of `n` into a number x (0 if there are none)
 * and multiply it by the sum of the digits.
 *
 * @see https://leetcode.com/problems/concatenate-non-zero-digits-and-multiply-by-sum-i/
 * @difficulty Easy
 * @timeComplexity O(log n)
 * @spaceComplexity O(log n)
 *
 * @example
 * concatenateNonZeroDigitsAndMultiplyBySumI(10203004); // 12340
 */
export const concatenateNonZeroDigitsAndMultiplyBySumI = (
	n: number,
): number => {
	const digits = String(n).replaceAll("0", "");
	const sum = [...digits].reduce((total, d) => total + Number(d), 0);
	return Number(digits || "0") * sum;
};
