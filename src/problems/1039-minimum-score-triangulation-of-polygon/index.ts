/**
 * 1039. Minimum Score Triangulation of Polygon
 *
 * A convex polygon's vertices have `values` in order. Triangulating it
 * scores the product of each triangle's vertex values, summed. Returns the
 * least possible score.
 *
 * Interval DP: in the polygon from vertex `i` to `j`, the edge `i–j` belongs
 * to one triangle with some apex `k` between them, splitting off the
 * polygons `i..k` and `k..j`.
 *
 * @see https://leetcode.com/problems/minimum-score-triangulation-of-polygon/
 * @difficulty Medium
 * @timeComplexity O(n^3)
 * @spaceComplexity O(n^2)
 *
 * @example
 * minimumScoreTriangulationOfPolygon([3, 7, 4, 5]); // 144
 */
export const minimumScoreTriangulationOfPolygon = (
	values: readonly number[],
): number => {
	const n = values.length;
	const best = Array.from({ length: n }, () => new Array<number>(n).fill(0));
	for (let gap = 2; gap < n; gap++) {
		for (let i = 0; i + gap < n; i++) {
			const j = i + gap;
			let score = Number.POSITIVE_INFINITY;
			for (let k = i + 1; k < j; k++) {
				score = Math.min(
					score,
					(best[i]?.[k] ?? 0) +
						(best[k]?.[j] ?? 0) +
						(values[i] ?? 0) * (values[k] ?? 0) * (values[j] ?? 0),
				);
			}
			const row = best[i];
			if (row) row[j] = score;
		}
	}
	return best[0]?.[n - 1] ?? 0;
};
