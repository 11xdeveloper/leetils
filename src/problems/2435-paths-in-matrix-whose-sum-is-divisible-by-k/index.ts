/**
 * 2435. Paths in Matrix Whose Sum Is Divisible by K
 *
 * Counts the right/down paths from the top-left to the bottom-right of
 * `grid` whose sum is divisible by `k`, modulo 10^9 + 7.
 *
 * DP per cell over the path sum modulo `k`.
 *
 * @see https://leetcode.com/problems/paths-in-matrix-whose-sum-is-divisible-by-k/
 * @difficulty Hard
 * @timeComplexity O(m · n · k)
 * @spaceComplexity O(n · k)
 *
 * @example
 * pathsInMatrixWhoseSumIsDivisibleByK([[5, 2, 4], [3, 0, 5], [0, 7, 2]], 3); // 2
 */
export const pathsInMatrixWhoseSumIsDivisibleByK = (
	grid: readonly (readonly number[])[],
	k: number,
): number => {
	const MOD = 1_000_000_007;
	const n = grid[0]?.length ?? 0;
	let above: number[][] = Array.from({ length: n }, () =>
		new Array<number>(k).fill(0),
	);
	for (const [r, row] of grid.entries()) {
		const current: number[][] = [];
		for (const [c, value] of row.entries()) {
			const ways = new Array<number>(k).fill(0);
			if (r === 0 && c === 0) ways[value % k] = 1;
			for (const from of [above[c], current[c - 1]]) {
				if (!from) continue;
				for (const [rest, count] of from.entries()) {
					if (!count) continue;
					const next = (rest + value) % k;
					ways[next] = ((ways[next] ?? 0) + count) % MOD;
				}
			}
			current.push(ways);
		}
		above = current;
	}
	return above[n - 1]?.[0] ?? 0;
};
