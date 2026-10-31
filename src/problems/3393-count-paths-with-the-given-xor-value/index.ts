const MOD = 1_000_000_007;

/**
 * 3393. Count Paths With the Given XOR Value
 *
 * Count the paths moving right or down from the top-left to the
 * bottom-right cell whose values XOR to `k`, modulo 10⁹ + 7.
 *
 * Values are below 16, so track, per cell, the number of paths reaching it
 * with each of the 16 possible XORs.
 *
 * @see https://leetcode.com/problems/count-paths-with-the-given-xor-value/
 * @difficulty Medium
 * @timeComplexity O(16 · m · n)
 * @spaceComplexity O(16 · n)
 *
 * @example
 * countPathsWithTheGivenXorValue([[2, 1, 5], [7, 10, 0], [12, 6, 4]], 11); // 3
 */
export const countPathsWithTheGivenXorValue = (
	grid: readonly (readonly number[])[],
	k: number,
): number => {
	const n = grid[0]?.length ?? 0;
	let above = new Float64Array(16 * n);
	grid.forEach((row, r) => {
		const current = new Float64Array(16 * n);
		row.forEach((value, c) => {
			for (let x = 0; x < 16; x++) {
				const ways =
					r === 0 && c === 0
						? x === 0
							? 1
							: 0
						: ((above[16 * c + x] ?? 0) +
								(c > 0 ? (current[16 * (c - 1) + x] ?? 0) : 0)) %
							MOD;
				if (ways === 0) continue;
				const at = 16 * c + (x ^ value);
				current[at] = ((current[at] ?? 0) + ways) % MOD;
			}
		});
		above = current;
	});
	return above[16 * (n - 1) + k] ?? 0;
};
