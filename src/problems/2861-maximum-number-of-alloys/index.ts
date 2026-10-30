/**
 * 2861. Maximum Number of Alloys
 *
 * Each of `k` machines makes an alloy from `composition[i][j]` units of
 * each metal `j`. With `stock` on hand and `cost[j]` per extra unit, and
 * using a single machine, returns the most alloys a `budget` can make.
 *
 * Binary search the count for each machine, pricing the metal it lacks.
 *
 * @see https://leetcode.com/problems/maximum-number-of-alloys/
 * @difficulty Medium
 * @timeComplexity O(k · n log(budget + stock))
 * @spaceComplexity O(1)
 *
 * @example
 * maximumNumberOfAlloys(3, 2, 15, [[1, 1, 1], [1, 1, 10]], [0, 0, 100], [1, 2, 3]); // 5
 */
export const maximumNumberOfAlloys = (
	n: number,
	_k: number,
	budget: number,
	composition: readonly (readonly number[])[],
	stock: readonly number[],
	cost: readonly number[],
): number => {
	let best = 0;
	for (const recipe of composition) {
		const affordable = (alloys: number): boolean => {
			let spent = 0;
			for (let j = 0; j < n; j++) {
				const missing = alloys * (recipe[j] ?? 0) - (stock[j] ?? 0);
				if (missing > 0) spent += missing * (cost[j] ?? 0);
				if (spent > budget) return false;
			}
			return true;
		};
		let low = best;
		let high = budget + Math.max(...stock);
		if (!affordable(low)) continue;
		while (low < high) {
			const mid = Math.ceil((low + high) / 2);
			if (affordable(mid)) low = mid;
			else high = mid - 1;
		}
		best = low;
	}
	return best;
};
