/**
 * 465. Optimal Account Balancing
 *
 * Each transaction `[from, to, amount]` records that `from` paid `amount` to
 * `to`. Returns the fewest transactions that settle everyone's debts.
 *
 * Only each person's net balance matters. A group of `k` people whose
 * balances sum to zero can always settle among themselves in `k - 1`
 * transactions, so the answer is the number of people with a non-zero
 * balance minus the most groups they can be split into. A DP over subsets
 * finds that: a subset's best split is the best of its subsets with one
 * person removed, plus one if the subset itself sums to zero (closing a
 * group).
 *
 * @see https://leetcode.com/problems/optimal-account-balancing/
 * @difficulty Hard
 * @timeComplexity O(2^p · p) where p is the number of people with debts
 * @spaceComplexity O(2^p)
 *
 * @example
 * optimalAccountBalancing([[0, 1, 10], [1, 0, 1], [1, 2, 5], [2, 0, 5]]); // 1
 */
export const optimalAccountBalancing = (
	transactions: readonly (readonly number[])[],
): number => {
	const balances = new Map<number, number>();
	for (const [from = 0, to = 0, amount = 0] of transactions) {
		balances.set(from, (balances.get(from) ?? 0) - amount);
		balances.set(to, (balances.get(to) ?? 0) + amount);
	}
	const debts = [...balances.values()].filter((balance) => balance !== 0);
	const people = debts.length;

	const sum = new Array<number>(1 << people).fill(0);
	const groups = new Array<number>(1 << people).fill(0);
	for (let mask = 1; mask < 1 << people; mask++) {
		const lowest = 31 - Math.clz32(mask & -mask);
		sum[mask] = (sum[mask ^ (1 << lowest)] ?? 0) + (debts[lowest] ?? 0);

		let best = 0;
		for (let person = 0; person < people; person++) {
			if (mask & (1 << person))
				best = Math.max(best, groups[mask ^ (1 << person)] ?? 0);
		}
		groups[mask] = best + (sum[mask] === 0 ? 1 : 0);
	}

	return people - (groups[(1 << people) - 1] ?? 0);
};
