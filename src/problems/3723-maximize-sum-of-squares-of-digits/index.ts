/**
 * 3723. Maximize Sum of Squares of Digits
 *
 * Among numbers with `num` digits whose digits add up to `sum`, find
 * those with the largest sum of squared digits and return the largest as
 * a string, or "" if none exist.
 *
 * Squares reward concentration, so use as many 9s as possible, then the
 * remainder, then zeros; that order is also the largest number.
 *
 * @see https://leetcode.com/problems/maximize-sum-of-squares-of-digits/
 * @difficulty Medium
 * @timeComplexity O(num)
 * @spaceComplexity O(num)
 *
 * @example
 * maximizeSumOfSquaresOfDigits(2, 17); // "98"
 */
export const maximizeSumOfSquaresOfDigits = (
	num: number,
	sum: number,
): string => {
	if (sum > 9 * num) return "";
	const nines = Math.floor(sum / 9);
	const rest = sum % 9;
	return (
		"9".repeat(nines) +
		(nines < num ? String(rest) + "0".repeat(num - nines - 1) : "")
	);
};
