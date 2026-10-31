/**
 * 3622. Check Divisibility by Digit Sum and Product
 *
 * Whether `n` is divisible by the sum of its digits plus their product.
 *
 * @see https://leetcode.com/problems/check-divisibility-by-digit-sum-and-product/
 * @difficulty Easy
 * @timeComplexity O(log n)
 * @spaceComplexity O(1)
 *
 * @example
 * checkDivisibilityByDigitSumAndProduct(99); // true
 */
export const checkDivisibilityByDigitSumAndProduct = (n: number): boolean => {
	let [sum, product] = [0, 1];
	for (let x = n; x > 0; x = Math.floor(x / 10)) {
		sum += x % 10;
		product *= x % 10;
	}
	return n % (sum + product) === 0;
};
