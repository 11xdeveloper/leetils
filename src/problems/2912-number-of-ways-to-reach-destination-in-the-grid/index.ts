const MOD = 1_000_000_007;

/**
 * 2912. Number of Ways to Reach Destination in the Grid
 *
 * On an `n × m` grid, each move goes to a different cell in the same row
 * or column. Returns the number of ways to go from `source` to `dest` in
 * exactly `k` moves, modulo 1e9 + 7.
 *
 * Only four situations matter: at the destination, in its row, in its
 * column, or neither. Count ways to be in each, step by step.
 *
 * @see https://leetcode.com/problems/number-of-ways-to-reach-destination-in-the-grid/
 * @difficulty Hard
 * @timeComplexity O(k)
 * @spaceComplexity O(1)
 *
 * @example
 * numberOfWaysToReachDestinationInTheGrid(3, 4, 3, [1, 2], [2, 3]); // 9
 */
export const numberOfWaysToReachDestinationInTheGrid = (
	n: number,
	m: number,
	k: number,
	source: readonly number[],
	dest: readonly number[],
): number => {
	const sameRow = source[0] === dest[0];
	const sameCol = source[1] === dest[1];
	let at = sameRow && sameCol ? 1 : 0;
	let row = sameRow && !sameCol ? 1 : 0;
	let col = sameCol && !sameRow ? 1 : 0;
	let neither = !sameRow && !sameCol ? 1 : 0;
	for (let step = 0; step < k; step++) {
		const nextAt = (row + col) % MOD;
		const nextRow = (at * (m - 1) + row * (m - 2) + neither) % MOD;
		const nextCol = (at * (n - 1) + col * (n - 2) + neither) % MOD;
		const nextNeither =
			(row * (n - 1) + col * (m - 1) + neither * (n + m - 4)) % MOD;
		at = nextAt;
		row = nextRow;
		col = nextCol;
		neither = nextNeither;
	}
	return at;
};
