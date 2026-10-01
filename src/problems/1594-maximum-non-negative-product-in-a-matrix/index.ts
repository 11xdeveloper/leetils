/**
 * 1594. Maximum Non Negative Product in a Matrix
 *
 * Moving only right or down from the top-left to the bottom-right of
 * `grid`, returns the largest non-negative product of the cells visited,
 * modulo 10^9 + 7, or -1 if every path's product is negative.
 *
 * Dynamic programming keeping both the largest and smallest product into
 * each cell, since a negative cell swaps them. Products can reach 4^29, so
 * they're kept as BigInts.
 *
 * @see https://leetcode.com/problems/maximum-non-negative-product-in-a-matrix/
 * @difficulty Medium
 * @timeComplexity O(mn)
 * @spaceComplexity O(mn)
 *
 * @example
 * maximumNonNegativeProductInAMatrix([[1, -2, 1], [1, -2, 1], [3, -4, 1]]); // 8
 */
export const maximumNonNegativeProductInAMatrix = (
	grid: readonly (readonly number[])[],
): number => {
	const m = grid.length;
	const n = grid[0]?.length ?? 0;
	const high: bigint[][] = Array.from({ length: m }, () =>
		new Array<bigint>(n).fill(0n),
	);
	const low: bigint[][] = Array.from({ length: m }, () =>
		new Array<bigint>(n).fill(0n),
	);
	for (let r = 0; r < m; r++) {
		for (let c = 0; c < n; c++) {
			const value = BigInt(grid[r]?.[c] ?? 0);
			const options: bigint[] = [];
			if (r === 0 && c === 0) options.push(value);
			for (const [r2, c2] of [
				[r - 1, c],
				[r, c - 1],
			] as const) {
				if (r2 < 0 || c2 < 0) continue;
				options.push(
					(high[r2]?.[c2] ?? 0n) * value,
					(low[r2]?.[c2] ?? 0n) * value,
				);
			}
			const [highRow, lowRow] = [high[r] ?? [], low[r] ?? []];
			highRow[c] = options.reduce((a, b) => (b > a ? b : a));
			lowRow[c] = options.reduce((a, b) => (b < a ? b : a));
		}
	}
	const best = high[m - 1]?.[n - 1] ?? -1n;
	return best < 0n ? -1 : Number(best % 1_000_000_007n);
};
