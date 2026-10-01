/**
 * 1314. Matrix Block Sum
 *
 * Returns a matrix where each cell holds the sum of `mat` over the square
 * of radius `k` around it, clipped to the matrix.
 *
 * Two-dimensional prefix sums give each clipped block's sum in constant
 * time.
 *
 * @see https://leetcode.com/problems/matrix-block-sum/
 * @difficulty Medium
 * @timeComplexity O(mn)
 * @spaceComplexity O(mn)
 *
 * @example
 * matrixBlockSum([[1, 2, 3], [4, 5, 6], [7, 8, 9]], 1); // [[12, 21, 16], [27, 45, 33], [24, 39, 28]]
 */
export const matrixBlockSum = (
	mat: readonly (readonly number[])[],
	k: number,
): number[][] => {
	const m = mat.length;
	const n = mat[0]?.length ?? 0;
	// prefix[r][c] sums mat[0 … r − 1][0 … c − 1].
	const prefix = Array.from({ length: m + 1 }, () =>
		new Array<number>(n + 1).fill(0),
	);
	const at = (r: number, c: number) => prefix[r]?.[c] ?? 0;
	for (let r = 1; r <= m; r++) {
		const row = prefix[r] ?? [];
		for (let c = 1; c <= n; c++) {
			row[c] =
				(mat[r - 1]?.[c - 1] ?? 0) +
				at(r - 1, c) +
				at(r, c - 1) -
				at(r - 1, c - 1);
		}
	}
	return Array.from({ length: m }, (_, r) =>
		Array.from({ length: n }, (_, c) => {
			const [top, bottom] = [Math.max(0, r - k), Math.min(m, r + k + 1)];
			const [left, right] = [Math.max(0, c - k), Math.min(n, c + k + 1)];
			return (
				at(bottom, right) - at(top, right) - at(bottom, left) + at(top, left)
			);
		}),
	);
};
