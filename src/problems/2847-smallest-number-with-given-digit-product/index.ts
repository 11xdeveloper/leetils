/**
 * 2847. Smallest Number With Given Digit Product
 *
 * Returns the smallest positive integer, as a string, whose digits
 * multiply to `n`, or "-1" if there is none.
 *
 * Divide out digits from 9 down to 2, which uses as few digits as
 * possible, then write them smallest first. Anything left over is a
 * prime factor above 7.
 *
 * @see https://leetcode.com/problems/smallest-number-with-given-digit-product/
 * @difficulty Medium
 * @timeComplexity O(log n)
 * @spaceComplexity O(log n)
 *
 * @example
 * smallestNumberWithGivenDigitProduct(105); // "357"
 */
export const smallestNumberWithGivenDigitProduct = (n: number): string => {
	if (n === 1) return "1";
	const digits: number[] = [];
	for (let d = 9; d >= 2; d--)
		while (n % d === 0) {
			digits.push(d);
			n /= d;
		}
	return n === 1 ? digits.reverse().join("") : "-1";
};
