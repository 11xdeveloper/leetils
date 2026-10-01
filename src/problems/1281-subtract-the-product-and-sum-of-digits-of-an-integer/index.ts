/**
 * 1281. Subtract the Product and Sum of Digits of an Integer
 *
 * Returns the product of `n`'s digits minus their sum.
 *
 * Peels off the digits one at a time.
 *
 * @see https://leetcode.com/problems/subtract-the-product-and-sum-of-digits-of-an-integer/
 * @difficulty Easy
 * @timeComplexity O(log n)
 * @spaceComplexity O(1)
 *
 * @example
 * subtractTheProductAndSumOfDigitsOfAnInteger(234); // 15
 */
export const subtractTheProductAndSumOfDigitsOfAnInteger = (
	n: number,
): number => {
	let [product, sum] = [1, 0];
	for (let rest = n; rest > 0; rest = Math.floor(rest / 10)) {
		product *= rest % 10;
		sum += rest % 10;
	}
	return product - sum;
};
