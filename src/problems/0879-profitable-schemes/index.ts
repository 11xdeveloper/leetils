/**
 * 879. Profitable Schemes
 *
 * Crime `i` needs `group[i]` members and earns `profit[i]`; each member can
 * take part in at most one crime. Counts the sets of crimes using at most
 * `n` members that earn at least `minProfit`, modulo 10^9 + 7.
 *
 * A 0/1 knapsack over (members used, profit so far), with profit capped at
 * `minProfit` since anything beyond it is equally good.
 *
 * @see https://leetcode.com/problems/profitable-schemes/
 * @difficulty Hard
 * @timeComplexity O(crimes · n · minProfit)
 * @spaceComplexity O(n · minProfit)
 *
 * @example
 * profitableSchemes(5, 3, [2, 2], [2, 3]); // 2
 */
export const profitableSchemes = (
	n: number,
	minProfit: number,
	group: readonly number[],
	profit: readonly number[],
): number => {
	const MOD = 1_000_000_007;
	const width = minProfit + 1;
	// ways[members * width + earned]
	const ways = new Array<number>((n + 1) * width).fill(0);
	ways[0] = 1;
	for (const [i, size] of group.entries()) {
		const gain = profit[i] ?? 0;
		for (let members = n; members >= size; members--) {
			for (let earned = minProfit; earned >= 0; earned--) {
				const from = (members - size) * width + earned;
				const to = members * width + Math.min(minProfit, earned + gain);
				ways[to] = ((ways[to] ?? 0) + (ways[from] ?? 0)) % MOD;
			}
		}
	}
	let total = 0;
	for (let members = 0; members <= n; members++)
		total = (total + (ways[members * width + minProfit] ?? 0)) % MOD;
	return total;
};
