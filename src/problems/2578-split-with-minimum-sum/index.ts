/**
 * 2578. Split With Minimum Sum
 *
 * Splits the digits of `num` between two numbers, using each digit once.
 * Returns the smallest possible sum of the two.
 *
 * Sort the digits and deal them alternately, smallest first, so the
 * smallest digits take the most significant places.
 *
 * @see https://leetcode.com/problems/split-with-minimum-sum/
 * @difficulty Easy
 * @timeComplexity O(d log d), where `d` is the number of digits
 * @spaceComplexity O(d)
 *
 * @example
 * splitWithMinimumSum(4325); // 59
 */
export const splitWithMinimumSum = (num: number): number => {
	const digits = [...String(num)].map(Number).sort((a, b) => a - b);
	let first = 0;
	let second = 0;
	for (const [i, digit] of digits.entries()) {
		if (i % 2 === 0) first = first * 10 + digit;
		else second = second * 10 + digit;
	}
	return first + second;
};
