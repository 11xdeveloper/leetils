const MOD = 1_000_000_007;

const multiply = (a: number, b: number): number =>
	(((a * Math.floor(b / 65536)) % MOD) * 65536 + a * (b % 65536)) % MOD;

/**
 * 3426. Manhattan Distances of All Arrangements of Pieces
 *
 * Over every way to place `k` identical pieces on distinct cells of an
 * m × n grid, add up the Manhattan distances between all pairs of pieces,
 * modulo 10⁹ + 7.
 *
 * Every pair of cells is occupied together in C(mn - 2, k - 2)
 * arrangements, so multiply that by the total distance over all pairs of
 * cells, which splits into rows and columns: Σ d (m - d) n² over row gaps
 * d, and likewise for columns.
 *
 * @see https://leetcode.com/problems/manhattan-distances-of-all-arrangements-of-pieces/
 * @difficulty Hard
 * @timeComplexity O(m · n)
 * @spaceComplexity O(1)
 *
 * @example
 * manhattanDistancesOfAllArrangementsOfPieces(2, 2, 2); // 8
 */
export const manhattanDistancesOfAllArrangementsOfPieces = (
	m: number,
	n: number,
	k: number,
): number => {
	let pairs = 0;
	for (let d = 1; d < m; d++)
		pairs = (pairs + multiply(multiply(d, m - d), multiply(n, n))) % MOD;
	for (let d = 1; d < n; d++)
		pairs = (pairs + multiply(multiply(d, n - d), multiply(m, m))) % MOD;
	const power = (base: number, exponent: number): number => {
		let result = 1;
		let b = base % MOD;
		for (let e = exponent; e > 0; e = Math.floor(e / 2)) {
			if (e % 2 === 1) result = multiply(result, b);
			b = multiply(b, b);
		}
		return result;
	};
	const cells = m * n;
	let numerator = 1;
	let denominator = 1;
	for (let i = 0; i < k - 2; i++) {
		numerator = multiply(numerator, cells - 2 - i);
		denominator = multiply(denominator, i + 1);
	}
	return multiply(pairs, multiply(numerator, power(denominator, MOD - 2)));
};
