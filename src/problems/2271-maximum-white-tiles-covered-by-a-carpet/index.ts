/**
 * 2271. Maximum White Tiles Covered by a Carpet
 *
 * `tiles[i] = [l, r]` marks disjoint white ranges. Returns the most white
 * tiles one carpet of length `carpetLen` can cover.
 *
 * Some best placement starts at a range's left end. Slide over the sorted
 * ranges, keeping the total of those fully covered, plus the covered part
 * of the next one.
 *
 * @see https://leetcode.com/problems/maximum-white-tiles-covered-by-a-carpet/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * maximumWhiteTilesCoveredByACarpet([[1, 5], [10, 11], [12, 18], [20, 25], [30, 32]], 10); // 9
 */
export const maximumWhiteTilesCoveredByACarpet = (
	tiles: readonly (readonly number[])[],
	carpetLen: number,
): number => {
	const sorted = tiles.toSorted((a, b) => (a[0] ?? 0) - (b[0] ?? 0));
	const n = sorted.length;
	let [best, covered, end] = [0, 0, 0];
	for (const [i, [start = 0, last = 0]] of sorted.entries()) {
		const reach = start + carpetLen - 1;
		while (end < n && (sorted[end]?.[1] ?? 0) <= reach) {
			const [l = 0, r = 0] = sorted[end] ?? [];
			covered += r - l + 1;
			end++;
		}
		const partial =
			end < n ? Math.max(0, reach - (sorted[end]?.[0] ?? 0) + 1) : 0;
		best = Math.max(best, covered + partial);
		if (end > i) covered -= last - start + 1;
		else end = i + 1;
	}
	return best;
};
