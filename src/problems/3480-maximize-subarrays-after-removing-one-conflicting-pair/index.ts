/**
 * 3480. Maximize Subarrays After Removing One Conflicting Pair
 *
 * Remove exactly one of the conflicting pairs, then count the subarrays of
 * [1, …, n] containing neither both members of any remaining pair. Returns
 * the largest count.
 *
 * For a right end r, a subarray must start after the largest a among pairs
 * (a, b) with a < b ≤ r. Sweep r keeping the two largest such a; removing
 * the pair holding the largest lets the start move back to the second, so
 * credit that pair with the difference. Add the best credit to the base
 * count.
 *
 * @see https://leetcode.com/problems/maximize-subarrays-after-removing-one-conflicting-pair/
 * @difficulty Hard
 * @timeComplexity O(n + p)
 * @spaceComplexity O(n + p)
 *
 * @example
 * maximizeSubarraysAfterRemovingOneConflictingPair(4, [[2, 3], [1, 4]]); // 9
 */
export const maximizeSubarraysAfterRemovingOneConflictingPair = (
	n: number,
	conflictingPairs: readonly (readonly number[])[],
): number => {
	const endingAt: [a: number, id: number][][] = Array.from(
		{ length: n + 1 },
		() => [],
	);
	conflictingPairs.forEach(([x = 0, y = 0], id) => {
		endingAt[Math.max(x, y)]?.push([Math.min(x, y), id]);
	});
	const gain = new Float64Array(conflictingPairs.length);
	let top = 0;
	let topId = -1;
	let second = 0;
	let base = 0;
	for (let r = 1; r <= n; r++) {
		for (const [a, id] of endingAt[r] ?? [])
			if (a > top) {
				second = top;
				top = a;
				topId = id;
			} else if (a > second) second = a;
		base += r - top;
		if (topId >= 0) gain[topId] = (gain[topId] ?? 0) + top - second;
	}
	return base + Math.max(0, ...gain);
};
