/**
 * 2234. Maximum Total Beauty of the Gardens
 *
 * Plants up to `newFlowers` more flowers across the gardens. A garden with
 * at least `target` flowers is complete, worth `full` each; the incomplete
 * ones add `partial` times their smallest flower count. Returns the most
 * total beauty.
 *
 * Cap counts at `target` and sort. Completing gardens costs least from the
 * largest down, so try completing each number of them; the remaining
 * flowers raise the smallest incomplete gardens to the highest level
 * below `target` they can afford, found by binary search.
 *
 * @see https://leetcode.com/problems/maximum-total-beauty-of-the-gardens/
 * @difficulty Hard
 * @timeComplexity O(n log n log target)
 * @spaceComplexity O(n)
 *
 * @example
 * maximumTotalBeautyOfTheGardens([1, 3, 1, 1], 7, 6, 12, 1); // 14
 */
export const maximumTotalBeautyOfTheGardens = (
	flowers: readonly number[],
	newFlowers: number,
	target: number,
	full: number,
	partial: number,
): number => {
	const gardens = flowers.map((f) => Math.min(f, target)).sort((a, b) => a - b);
	const n = gardens.length;
	const prefix = [0];
	for (const f of gardens) prefix.push((prefix.at(-1) ?? 0) + f);

	/** The highest level below target the first `count` gardens can reach. */
	const highestLevel = (count: number, budget: number): number => {
		let [lo, hi] = [gardens[0] ?? 0, target - 1];
		while (lo < hi) {
			const level = Math.ceil((lo + hi) / 2);
			// Gardens below `level` among the first `count`.
			let [a, b] = [0, count];
			while (a < b) {
				const mid = (a + b) >> 1;
				if ((gardens[mid] ?? 0) < level) a = mid + 1;
				else b = mid;
			}
			if (level * a - (prefix[a] ?? 0) <= budget) lo = level;
			else hi = level - 1;
		}
		return lo;
	};

	let best = 0;
	let completionCost = 0;
	for (let complete = 0; complete <= n; complete++) {
		if (complete > 0) completionCost += target - (gardens[n - complete] ?? 0);
		if (completionCost > newFlowers) break;
		const incomplete = n - complete;
		// Gardens already at target can't count as incomplete.
		if (incomplete > 0 && (gardens[incomplete - 1] ?? 0) >= target) continue;
		const partialScore =
			incomplete > 0
				? highestLevel(incomplete, newFlowers - completionCost) * partial
				: 0;
		best = Math.max(best, complete * full + partialScore);
	}
	return best;
};
