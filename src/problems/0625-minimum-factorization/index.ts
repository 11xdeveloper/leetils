/**
 * 625. Minimum Factorization
 *
 * Returns the smallest positive integer whose digits multiply to `num`, or
 * 0 if there's none or it doesn't fit in a signed 32-bit integer.
 *
 * Fewer digits make a smaller number, so it divides out the largest digits
 * first, 9 down to 2, which also leaves the smallest digits for the front
 * when the digits are written in ascending order. Anything left over is a
 * prime above 7, which no digit can make.
 *
 * @see https://leetcode.com/problems/minimum-factorization/
 * @difficulty Medium
 * @timeComplexity O(log num)
 * @spaceComplexity O(log num)
 *
 * @example
 * minimumFactorization(48); // 68
 */
export const minimumFactorization = (num: number): number => {
	if (num < 10) return num;

	const digits: number[] = [];
	for (let digit = 9; digit >= 2; digit--) {
		while (num % digit === 0) {
			digits.push(digit);
			num /= digit;
		}
	}
	if (num > 1) return 0;

	const result = Number(digits.reverse().join(""));
	return result > 2 ** 31 - 1 ? 0 : result;
};
