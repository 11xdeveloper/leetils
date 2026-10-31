/**
 * 3155. Maximum Number of Upgradable Servers
 *
 * Each data center has `count[i]` servers, each costing `upgrade[i]` to
 * upgrade or selling for `sell[i]`, and starts with `money[i]`. Returns the
 * most servers each can upgrade.
 *
 * Selling x servers lets the rest be upgraded once
 * (count - x) · upgrade ≤ money + x · sell, so sell the smallest such x.
 *
 * @see https://leetcode.com/problems/maximum-number-of-upgradable-servers/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * maximumNumberOfUpgradableServers([4, 3], [3, 5], [4, 2], [8, 9]); // [3, 2]
 */
export const maximumNumberOfUpgradableServers = (
	count: readonly number[],
	upgrade: readonly number[],
	sell: readonly number[],
	money: readonly number[],
): number[] =>
	count.map((servers, i) => {
		const cost = upgrade[i] ?? 0;
		const shortfall = servers * cost - (money[i] ?? 0);
		const sold =
			shortfall <= 0 ? 0 : Math.ceil(shortfall / (cost + (sell[i] ?? 0)));
		return servers - Math.min(servers, sold);
	});
