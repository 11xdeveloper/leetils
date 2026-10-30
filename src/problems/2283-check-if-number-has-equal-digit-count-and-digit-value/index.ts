/**
 * 2283. Check if Number Has Equal Digit Count and Digit Value
 *
 * Returns whether, for every index `i`, digit `i` occurs `num[i]` times in
 * `num`.
 *
 * @see https://leetcode.com/problems/check-if-number-has-equal-digit-count-and-digit-value/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * checkIfNumberHasEqualDigitCountAndDigitValue("1210"); // true
 */
export const checkIfNumberHasEqualDigitCountAndDigitValue = (
	num: string,
): boolean => {
	const counts = new Array<number>(10).fill(0);
	for (const digit of num)
		counts[Number(digit)] = (counts[Number(digit)] ?? 0) + 1;
	return [...num].every((digit, i) => Number(digit) === counts[i]);
};
