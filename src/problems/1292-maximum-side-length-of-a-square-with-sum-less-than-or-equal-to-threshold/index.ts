/**
 * 1292. Maximum Side Length of a Square with Sum Less than or Equal to Threshold
 *
 * Returns the largest side of a square in `mat` whose elements sum to at
 * most `threshold`, or 0 if there's none.
 *
 * Two-dimensional prefix sums give any square's sum in constant time. The
 * values are non-negative, so while scanning bottom-right corners the best
 * side can only grow: each corner just checks whether a square one larger
 * than the best so far fits.
 *
 * @see https://leetcode.com/problems/maximum-side-length-of-a-square-with-sum-less-than-or-equal-to-threshold/
 * @difficulty Medium
 * @timeComplexity O(mn)
 * @spaceComplexity O(mn)
 *
 * @example
 * maximumSideLengthOfASquareWithSumLessThanOrEqualToThreshold([[1, 1, 3, 2, 4, 3, 2], [1, 1, 3, 2, 4, 3, 2], [1, 1, 3, 2, 4, 3, 2]], 4); // 2
 */
export const maximumSideLengthOfASquareWithSumLessThanOrEqualToThreshold = (
	mat: readonly (readonly number[])[],
	threshold: number,
): number => {
	const m = mat.length;
	const n = mat[0]?.length ?? 0;
	// prefix[r][c] sums mat[0 … r − 1][0 … c − 1].
	const prefix = Array.from({ length: m + 1 }, () =>
		new Array<number>(n + 1).fill(0),
	);
	const at = (r: number, c: number) => prefix[r]?.[c] ?? 0;
	let best = 0;
	for (let r = 1; r <= m; r++) {
		const row = prefix[r] ?? [];
		for (let c = 1; c <= n; c++) {
			row[c] =
				(mat[r - 1]?.[c - 1] ?? 0) +
				at(r - 1, c) +
				at(r, c - 1) -
				at(r - 1, c - 1);
			const side = best + 1;
			if (side > r || side > c) continue;
			const sum =
				at(r, c) - at(r - side, c) - at(r, c - side) + at(r - side, c - side);
			if (sum <= threshold) best = side;
		}
	}
	return best;
};
