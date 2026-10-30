const MOD = 12345;

/**
 * 2906. Construct Product Matrix
 *
 * Returns a matrix where each cell holds the product of every other cell
 * of `grid`, modulo 12345.
 *
 * Read the grid as one flat list and multiply prefix products by suffix
 * products; 12345 isn't prime, so division isn't available.
 *
 * @see https://leetcode.com/problems/construct-product-matrix/
 * @difficulty Medium
 * @timeComplexity O(n · m)
 * @spaceComplexity O(n · m)
 *
 * @example
 * constructProductMatrix([[1, 2], [3, 4]]); // [[24, 12], [8, 6]]
 */
export const constructProductMatrix = (
	grid: readonly (readonly number[])[],
): number[][] => {
	const flat = grid.flat();
	const result = flat.map(() => 1);
	let prefix = 1;
	for (const [i, value] of flat.entries()) {
		result[i] = prefix;
		prefix = (prefix * (value % MOD)) % MOD;
	}
	let suffix = 1;
	for (let i = flat.length - 1; i >= 0; i--) {
		result[i] = ((result[i] ?? 1) * suffix) % MOD;
		suffix = (suffix * ((flat[i] ?? 1) % MOD)) % MOD;
	}
	const cols = grid[0]?.length ?? 0;
	return grid.map((_, r) => result.slice(r * cols, (r + 1) * cols));
};
