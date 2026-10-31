/**
 * 3572. Maximize Y‑Sum by Picking a Triplet of Distinct X‑Values
 *
 * Pick three indices whose `x` values are all different, maximising the
 * sum of their `y` values. Returns that sum, or -1 if there aren't three
 * distinct `x` values.
 *
 * Only the largest `y` for each `x` matters; add the three largest.
 *
 * @see https://leetcode.com/problems/maximize-ysum-by-picking-a-triplet-of-distinct-xvalues/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * maximizeYsumByPickingATripletOfDistinctXvalues([1, 2, 1, 3, 2], [5, 3, 4, 6, 2]); // 14
 */
export const maximizeYsumByPickingATripletOfDistinctXvalues = (
	x: readonly number[],
	y: readonly number[],
): number => {
	const best = new Map<number, number>();
	x.forEach((key, i) => {
		best.set(key, Math.max(best.get(key) ?? 0, y[i] ?? 0));
	});
	if (best.size < 3) return -1;
	const top = [...best.values()].sort((a, b) => b - a);
	return (top[0] ?? 0) + (top[1] ?? 0) + (top[2] ?? 0);
};
