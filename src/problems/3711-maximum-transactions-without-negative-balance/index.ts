import { Heap } from "../../internal/heap";

/**
 * 3711. Maximum Transactions Without Negative Balance
 *
 * Process `transactions` in order, choosing which to perform, so the
 * balance (starting at 0) never goes negative. Returns the most
 * transactions performed.
 *
 * Perform every transaction; whenever the balance dips below zero, undo
 * the most negative one performed so far, which restores the most balance
 * for the loss of one.
 *
 * @see https://leetcode.com/problems/maximum-transactions-without-negative-balance/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * maximumTransactionsWithoutNegativeBalance([7, -5, 3, -8]); // 3
 */
export const maximumTransactionsWithoutNegativeBalance = (
	transactions: readonly number[],
): number => {
	const taken = new Heap<number>((a, b) => a - b);
	let balance = 0;
	for (const amount of transactions) {
		balance += amount;
		taken.push(amount);
		if (balance < 0) balance -= taken.pop() ?? 0;
	}
	return taken.size;
};
