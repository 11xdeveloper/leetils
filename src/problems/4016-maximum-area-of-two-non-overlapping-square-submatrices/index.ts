/**
 * 4016. Maximum Area of Two Non-Overlapping Square Submatrices
 *
 * The largest area of two equal, non-overlapping squares of 1s in `mat`
 * (the area of each), or 0.
 *
 * Two squares of side k fit exactly when some two squares of side k are
 * k apart in rows or in columns, so only the extreme top-left corners
 * matter. That property shrinks with k, so binary search it, using the
 * largest square ending at each cell.
 *
 * @see https://leetcode.com/problems/maximum-area-of-two-non-overlapping-square-submatrices/
 * @difficulty Medium
 * @timeComplexity O(m · n log min(m, n))
 * @spaceComplexity O(m · n)
 *
 * @example
 * maximumAreaOfTwoNonOverlappingSquareSubmatrices([[1, 1, 1, 0], [1, 1, 1, 1], [0, 0, 1, 1]]); // 4
 */
export const maximumAreaOfTwoNonOverlappingSquareSubmatrices = (
	mat: readonly (readonly number[])[],
): number => {
	const m = mat.length;
	const n = mat[0]?.length ?? 0;
	// side[r * n + c]: the largest all-1 square with its bottom-right corner here.
	const side = new Int32Array(m * n);
	for (let r = 0; r < m; r++)
		for (let c = 0; c < n; c++)
			if (mat[r]?.[c])
				side[r * n + c] =
					1 +
					Math.min(
						r && c ? (side[(r - 1) * n + c - 1] ?? 0) : 0,
						r ? (side[(r - 1) * n + c] ?? 0) : 0,
						c ? (side[r * n + c - 1] ?? 0) : 0,
					);
	const twoFit = (k: number): boolean => {
		let [top, bottom, left, right] = [
			Number.POSITIVE_INFINITY,
			Number.NEGATIVE_INFINITY,
			Number.POSITIVE_INFINITY,
			Number.NEGATIVE_INFINITY,
		];
		for (let r = 0; r < m; r++)
			for (let c = 0; c < n; c++)
				if ((side[r * n + c] ?? 0) >= k) {
					top = Math.min(top, r);
					bottom = Math.max(bottom, r);
					left = Math.min(left, c);
					right = Math.max(right, c);
				}
		return bottom - top >= k || right - left >= k;
	};
	let [lo, hi] = [0, Math.min(m, n)];
	while (lo < hi) {
		const mid = (lo + hi + 1) >>> 1;
		if (twoFit(mid)) lo = mid;
		else hi = mid - 1;
	}
	return lo * lo;
};
