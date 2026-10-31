const MOD = 1_000_000_007;

const multiply = (a: number, b: number): number =>
	(((a * Math.floor(b / 65536)) % MOD) * 65536 + a * (b % 65536)) % MOD;

/**
 * 3700. Number of ZigZag Arrays II
 *
 * Counts arrays of length `n` (up to 1e9) with values from `l` to `r` (at
 * most 76 values) whose neighbours always differ and alternate between
 * going up and going down, modulo 1e9+7.
 *
 * As in part I, count only arrays ending with a rise, using the
 * reflection between rises and falls; one more element is a fixed linear
 * map on those counts, so raise its matrix to the power n - 2.
 *
 * @see https://leetcode.com/problems/number-of-zigzag-arrays-ii/
 * @difficulty Hard
 * @timeComplexity O((r - l)³ log n)
 * @spaceComplexity O((r - l)²)
 *
 * @example
 * numberOfZigzagArraysII(3, 1, 3); // 10
 */
export const numberOfZigzagArraysII = (
	n: number,
	l: number,
	r: number,
): number => {
	const m = r - l + 1;
	if (n === 1) return m % MOD;
	const times = (a: number[][], b: number[][]): number[][] =>
		a.map((row) =>
			Array.from({ length: m }, (_, j) => {
				let sum = 0;
				row.forEach((value, k) => {
					if (value) sum = (sum + multiply(value, b[k]?.[j] ?? 0)) % MOD;
				});
				return sum;
			}),
		);
	// step[v][w]: a rise ending at w leads to a rise ending at v when m - 1 - w < v.
	let power: number[][] = Array.from({ length: m }, (_, v) =>
		Array.from({ length: m }, (_, w) => (m - 1 - w < v ? 1 : 0)),
	);
	let result: number[][] = Array.from({ length: m }, (_, v) =>
		Array.from({ length: m }, (_, w) => (v === w ? 1 : 0)),
	);
	for (let e = n - 2; e > 0; e = Math.floor(e / 2)) {
		if (e % 2 === 1) result = times(result, power);
		power = times(power, power);
	}
	let total = 0;
	result.forEach((row) => {
		row.forEach((value, w) => {
			total = (total + multiply(value, w)) % MOD;
		});
	});
	return (2 * total) % MOD;
};
