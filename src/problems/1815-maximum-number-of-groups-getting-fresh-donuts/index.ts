/**
 * 1815. Maximum Number of Groups Getting Fresh Donuts
 *
 * Donuts are baked in batches of `batchSize` and served to groups in an
 * order you choose; a group is happy if its first donut starts a fresh
 * batch. Returns the most happy groups.
 *
 * Only group sizes modulo `batchSize` matter. Groups with remainder 0 are
 * always happy, and pairs of complementary remainders make one happy group
 * each. The rest is a memoised search over how many of each remainder are
 * left: the next group is happy exactly when the served total so far is a
 * multiple of `batchSize`.
 *
 * @see https://leetcode.com/problems/maximum-number-of-groups-getting-fresh-donuts/
 * @difficulty Hard
 * @timeComplexity O(S · b) for S reachable remainder-count states
 * @spaceComplexity O(S)
 *
 * @example
 * maximumNumberOfGroupsGettingFreshDonuts(3, [1, 2, 3, 4, 5, 6]); // 4
 */
export const maximumNumberOfGroupsGettingFreshDonuts = (
	batchSize: number,
	groups: readonly number[],
): number => {
	const counts = new Array<number>(batchSize).fill(0);
	for (const group of groups)
		counts[group % batchSize] = (counts[group % batchSize] ?? 0) + 1;
	let happy = counts[0] ?? 0;
	counts[0] = 0;
	for (let r = 1; r < batchSize - r; r++) {
		const pairs = Math.min(counts[r] ?? 0, counts[batchSize - r] ?? 0);
		happy += pairs;
		counts[r] = (counts[r] ?? 0) - pairs;
		counts[batchSize - r] = (counts[batchSize - r] ?? 0) - pairs;
	}
	if (batchSize % 2 === 0) {
		const half = batchSize / 2;
		happy += Math.floor((counts[half] ?? 0) / 2);
		counts[half] = (counts[half] ?? 0) % 2;
	}
	const memo = new Map<string, number>();
	const best = (served: number): number => {
		if (counts.every((count) => count === 0)) return 0;
		const key = counts.join(",");
		const cached = memo.get(key);
		if (cached !== undefined) return cached;
		const bonus = served % batchSize === 0 ? 1 : 0;
		let result = 0;
		for (let r = 1; r < batchSize; r++) {
			if (!counts[r]) continue;
			counts[r] = (counts[r] ?? 0) - 1;
			result = Math.max(result, bonus + best(served + r));
			counts[r] = (counts[r] ?? 0) + 1;
		}
		memo.set(key, result);
		return result;
	};
	return happy + best(0);
};
