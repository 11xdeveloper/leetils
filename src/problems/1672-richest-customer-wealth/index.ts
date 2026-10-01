/**
 * 1672. Richest Customer Wealth
 *
 * Returns the largest total across a customer's bank accounts.
 *
 * Sums each row and takes the maximum.
 *
 * @see https://leetcode.com/problems/richest-customer-wealth/
 * @difficulty Easy
 * @timeComplexity O(mn)
 * @spaceComplexity O(1)
 *
 * @example
 * richestCustomerWealth([[1, 5], [7, 3], [3, 5]]); // 10
 */
export const richestCustomerWealth = (
	accounts: readonly (readonly number[])[],
): number =>
	Math.max(
		...accounts.map((row) => row.reduce((sum, money) => sum + money, 0)),
	);
