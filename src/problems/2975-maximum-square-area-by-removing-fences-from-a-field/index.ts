/**
 * 2975. Maximum Square Area by Removing Fences From a Field
 *
 * A field spans `1..m` by `1..n`, with fences at its edges and at the
 * listed inner positions, any of which may be removed. Returns the area
 * of the largest square field possible, modulo 1e9 + 7, or -1.
 *
 * Any two horizontal fences give a height; any two vertical ones a
 * width. Find the largest value that's both.
 *
 * @see https://leetcode.com/problems/maximum-square-area-by-removing-fences-from-a-field/
 * @difficulty Medium
 * @timeComplexity O(h² + v²)
 * @spaceComplexity O(h²)
 *
 * @example
 * maximumSquareAreaByRemovingFencesFromAField(4, 3, [2, 3], [2]); // 4
 */
export const maximumSquareAreaByRemovingFencesFromAField = (
	m: number,
	n: number,
	hFences: readonly number[],
	vFences: readonly number[],
): number => {
	const gaps = (fences: readonly number[], end: number): Set<number> => {
		const all = [1, ...fences, end];
		const result = new Set<number>();
		for (let i = 0; i < all.length; i++)
			for (let j = i + 1; j < all.length; j++)
				result.add(Math.abs((all[i] ?? 0) - (all[j] ?? 0)));
		return result;
	};
	const heights = gaps(hFences, m);
	let side = 0;
	for (const width of gaps(vFences, n))
		if (heights.has(width)) side = Math.max(side, width);
	if (side === 0) return -1;
	return Number((BigInt(side) * BigInt(side)) % 1_000_000_007n);
};
