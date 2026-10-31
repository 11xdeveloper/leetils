/**
 * 4041. Minimum Operations to Form Subset Sum II
 *
 * One operation doubles or halves (rounding down) an element. Returns the
 * fewest operations after which some subset of `nums` sums to `sum`, or
 * -1.
 *
 * Doubling then halving cancels and halving then doubling clears the
 * lowest bit, so each element reaches ⌊x / 2^b⌋ · 2^a for a + b steps.
 * A knapsack over sums then picks each element's value, or leaves it out.
 *
 * @see https://leetcode.com/problems/minimum-operations-to-form-subset-sum-ii/
 * @difficulty Hard
 * @timeComplexity O(n · sum · log² V)
 * @spaceComplexity O(sum)
 *
 * @example
 * minimumOperationsToFormSubsetSumII([10, 2], 13); // 3
 */
export const minimumOperationsToFormSubsetSumII = (
	nums: readonly number[],
	sum: number,
): number => {
	let best = new Float64Array(sum + 1).fill(Number.POSITIVE_INFINITY);
	best[0] = 0;
	for (const x of nums) {
		const options = new Map<number, number>();
		for (let base = x, b = 0; base > 0; base = Math.floor(base / 2), b++)
			for (let v = base, a = 0; v <= sum; v *= 2, a++)
				options.set(v, Math.min(options.get(v) ?? a + b, a + b));
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
