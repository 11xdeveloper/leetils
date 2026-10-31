/**
 * 2806. Account Balance After Rounded Purchase
 *
 * Starting with 100 dollars, buys something whose price is rounded to the
 * nearest multiple of 10, with 5 rounding up. Returns the balance left.
 *
 * Round half up to tens.
 *
 * @see https://leetcode.com/problems/account-balance-after-rounded-purchase/
 * @difficulty Easy
 * @timeComplexity O(1)
 * @spaceComplexity O(1)
 *
 * @example
 * accountBalanceAfterRoundedPurchase(15); // 80
 */
export const accountBalanceAfterRoundedPurchase = (
	purchaseAmount: number,
): number => 100 - 10 * Math.floor((purchaseAmount + 5) / 10);
