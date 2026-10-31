/**
 * 2318. Number of Distinct Roll Sequences
 *
 * Counts the sequences of `n` die rolls in which adjacent values are
 * coprime and equal values are more than two rolls apart, modulo
 * 10^9 + 7.
 *
 * DP over the last two values rolled.
 *
 * @see https://leetcode.com/problems/number-of-distinct-roll-sequences/
 * @difficulty Hard
 * @timeComplexity O(n · 6^3)
 * @spaceComplexity O(6^2)
 *
 * @example
 * numberOfDistinctRollSequences(4); // 184
 */
export const numberOfDistinctRollSequences = (n: number): number => {
	const MOD = 1_000_000_007;
	if (n === 1) return 6;
	const gcd = (a: number, b: number): number => {
		while (b) [a, b] = [b, a % b];
		return a;
	};
	const fits = (a: number, b: number): boolean => a !== b && gcd(a, b) === 1;
	// ways[a][b]: sequences ending with rolls a then b (values 1 to 6).
	let ways: number[][] = Array.from({ length: 7 }, (_, a) =>
		Array.from({ length: 7 }, (_, b) => (a && b && fits(a, b) ? 1 : 0)),
	);
	for (let roll = 3; roll <= n; roll++) {
		const next = Array.from({ length: 7 }, () => new Array<number>(7).fill(0));
		for (let a = 1; a <= 6; a++) {
			for (let b = 1; b <= 6; b++) {
				const count = ways[a]?.[b] ?? 0;
				if (!count) continue;
				for (let c = 1; c <= 6; c++) {
					if (c === a || !fits(b, c)) continue;
					const row = next[b] ?? [];
					row[c] = ((row[c] ?? 0) + count) % MOD;
				}
			}
		}
		ways = next;
	}
	return ways.flat().reduce((sum, count) => (sum + count) % MOD, 0);
};
