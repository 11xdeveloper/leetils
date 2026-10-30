const MOD = 1_000_000_007;

const multiply = (a: number, b: number): number =>
	(((a * Math.floor(b / 65536)) % MOD) * 65536 + a * (b % 65536)) % MOD;

/**
 * 2681. Power of Heroes
 *
 * A group of heroes has power `max² · min` of their strengths. Returns
 * the total power of every non-empty group, modulo 1e9 + 7.
 *
 * Sort, and take each hero as the maximum. Its groups contribute `x²`
 * times the sum of their minimums: `x` itself alone, plus each earlier
 * hero `j` weighted by the `2^(i - j - 1)` ways to fill in between, a sum
 * kept running as `s = 2s + x`.
 *
 * @see https://leetcode.com/problems/power-of-heroes/
 * @difficulty Hard
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * powerOfHeroes([2, 1, 4]); // 141
 */
export const powerOfHeroes = (nums: readonly number[]): number => {
	let total = 0;
	let minimums = 0;
	for (const x of nums.toSorted((a, b) => a - b)) {
		total = (total + multiply(multiply(x, x), (minimums + x) % MOD)) % MOD;
		minimums = (2 * minimums + x) % MOD;
	}
	return total;
};
