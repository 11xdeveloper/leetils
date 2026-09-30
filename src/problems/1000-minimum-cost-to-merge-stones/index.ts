/**
 * 1000. Minimum Cost to Merge Stones
 *
 * A move merges exactly `k` consecutive piles into one, costing their total.
 * Returns the least cost to merge all `stones` piles into one, or -1 if
 * that's impossible.
 *
 * Each move removes `k - 1` piles, so it's possible exactly when
 * `(n - 1) % (k - 1) === 0`. Interval DP: `cost[i][j]` is the least cost of
 * merging `stones[i..j]` as far as possible. Splits put a group that merges
 * down to one pile on the left, stepping by `k - 1`, and when the range can
 * become a single pile, its final merge adds the range's total.
 *
 * @see https://leetcode.com/problems/minimum-cost-to-merge-stones/
 * @difficulty Hard
 * @timeComplexity O(n^3 / k)
 * @spaceComplexity O(n^2)
 *
 * @example
 * minimumCostToMergeStones([3, 2, 4, 1], 2); // 20
 */
export const minimumCostToMergeStones = (
	stones: readonly number[],
	k: number,
): number => {
	const n = stones.length;
	if ((n - 1) % (k - 1) !== 0) return -1;
	const prefix = [0];
	for (const stone of stones) prefix.push((prefix.at(-1) ?? 0) + stone);

	const cost = Array.from({ length: n }, () => new Array<number>(n).fill(0));
	for (let length = k; length <= n; length++) {
		for (let i = 0; i + length <= n; i++) {
			const j = i + length - 1;
			let best = Number.POSITIVE_INFINITY;
			for (let mid = i; mid < j; mid += k - 1)
				best = Math.min(
					best,
					(cost[i]?.[mid] ?? 0) + (cost[mid + 1]?.[j] ?? 0),
				);
			if ((length - 1) % (k - 1) === 0)
				best += (prefix[j + 1] ?? 0) - (prefix[i] ?? 0);
			const row = cost[i];
			if (row) row[j] = best;
		}
	}
	return cost[0]?.[n - 1] ?? 0;
};
