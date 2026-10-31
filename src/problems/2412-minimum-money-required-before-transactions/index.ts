/**
 * 2412. Minimum Money Required Before Transactions
 *
 * A transaction `[cost, cashback]` needs at least `cost` money, then adds
 * `cashback`. Returns the least starting money that completes every
 * transaction in any order.
 *
 * The worst order does every losing transaction first. On top of their
 * total loss, the last transaction needs its own requirement: a losing
 * one's cashback (its loss is already counted), or a gaining one's cost.
 *
 * @see https://leetcode.com/problems/minimum-money-required-before-transactions/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * minimumMoneyRequiredBeforeTransactions([[2, 1], [5, 0], [4, 2]]); // 10
 */
export const minimumMoneyRequiredBeforeTransactions = (
	transactions: readonly (readonly number[])[],
): number => {
	let [loss, extra] = [0, 0];
	for (const [cost = 0, cashback = 0] of transactions) {
		if (cost > cashback) {
			loss += cost - cashback;
			extra = Math.max(extra, cashback);
		} else extra = Math.max(extra, cost);
	}
	return loss + extra;
};
