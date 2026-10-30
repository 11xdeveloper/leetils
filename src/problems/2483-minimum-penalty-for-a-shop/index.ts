/**
 * 2483. Minimum Penalty for a Shop
 *
 * `customers[i]` is "Y" if customers come in hour `i`. Closing at hour `j`
 * costs 1 per open hour without customers and 1 per closed hour with
 * them. Returns the earliest closing hour with the least penalty.
 *
 * Moving the closing time past an hour changes the penalty by -1 for a
 * "Y" and +1 for an "N"; track the running change.
 *
 * @see https://leetcode.com/problems/minimum-penalty-for-a-shop/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * minimumPenaltyForAShop("YYNY"); // 2
 */
export const minimumPenaltyForAShop = (customers: string): number => {
	let [change, best, hour] = [0, 0, 0];
	for (let i = 0; i < customers.length; i++) {
		change += customers[i] === "Y" ? -1 : 1;
		if (change < best) [best, hour] = [change, i + 1];
	}
	return hour;
};
