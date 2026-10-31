/**
 * 2152. Minimum Number of Lines to Cover Points
 *
 * Returns the fewest straight lines needed to cover every point (at most
 * 10 distinct points).
 *
 * Bitmask DP over covered points: the lowest uncovered point lies on some
 * line, either alone or through another point, which covers everything
 * collinear with the two.
 *
 * @see https://leetcode.com/problems/minimum-number-of-lines-to-cover-points/
 * @difficulty Medium
 * @timeComplexity O(2^n · n + n^3)
 * @spaceComplexity O(2^n + n^2)
 *
 * @example
 * minimumNumberOfLinesToCoverPoints([[0, 1], [2, 3], [4, 5], [4, 3]]); // 2
 */
export const minimumNumberOfLinesToCoverPoints = (
	points: readonly (readonly number[])[],
): number => {
	const n = points.length;
	const lines: number[][] = points.map((_, i) =>
		points.map(([x2 = 0, y2 = 0], j) => {
			const [x1 = 0, y1 = 0] = points[i] ?? [];
			let mask = (1 << i) | (1 << j);
			for (const [k, [x3 = 0, y3 = 0]] of points.entries()) {
				if ((x2 - x1) * (y3 - y1) === (y2 - y1) * (x3 - x1)) mask |= 1 << k;
			}
			return i === j ? 1 << i : mask;
		}),
	);
	const full = (1 << n) - 1;
	const best = new Array<number>(1 << n).fill(Infinity);
	best[0] = 0;
	for (let mask = 0; mask < full; mask++) {
		const used = best[mask] ?? Infinity;
		if (used === Infinity) continue;
		let first = 0;
		while (mask & (1 << first)) first++;
		for (const line of lines[first] ?? []) {
			const next = mask | line;
			best[next] = Math.min(best[next] ?? Infinity, used + 1);
		}
	}
	return best[full] ?? 0;
};
