/**
 * 4040. Minimum Operations to Form Subset Sum I
 *
 * One operation doubles or halves (rounding down) an element. Returns the
 * fewest operations after which some subset of `nums` sums to `sum`, or
 * -1.
 *
 * All doublings come before any halving, and halving after doubling just
 * undoes it, so each element only reaches x · 2^a or ⌊x / 2^b⌋.
 * A knapsack over sums then picks each element's value, or leaves it out.
 *
 * @see https://leetcode.com/problems/minimum-operations-to-form-subset-sum-i/
 * @difficulty Medium
 * @timeComplexity O(n · sum · log² V)
 * @spaceComplexity O(sum)
 *
 * @example
 * minimumOperationsToFormSubsetSumI([10, 2], 13); // 3
 */
export const minimumOperationsToFormSubsetSumI = (
	nums: readonly number[],
	sum: number,
): number => {
	let best = new Float64Array(sum + 1).fill(Number.POSITIVE_INFINITY);
	best[0] = 0;
	for (const x of nums) {
		const options = new Map<number, number>();
		for (let v = x, cost = 0; v <= sum; v *= 2, cost++)
			options.set(v, Math.min(options.get(v) ?? cost, cost));
		for (
			let v = Math.floor(x / 2), cost = 1;
			v > 0;
			v = Math.floor(v / 2), cost++
		)
			options.set(v, Math.min(options.get(v) ?? cost, cost));
		const next = Float64Array.from(best);
		for (const [value, cost] of options)
			for (let s = value; s <= sum; s++) {
				const candidate = (best[s - value] ?? Number.POSITIVE_INFINITY) + cost;
				if (candidate < (next[s] ?? 0)) next[s] = candidate;
			}
		best = next;
	}
	const answer = best[sum] ?? Number.POSITIVE_INFINITY;
	return answer === Number.POSITIVE_INFINITY ? -1 : answer;
};
