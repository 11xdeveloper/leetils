const MOD = 1_000_000_007;

/**
 * 3193. Count the Number of Inversions
 *
 * Count the permutations of 0 to n - 1 where, for each requirement
 * `[end, cnt]`, the prefix up to `end` has exactly `cnt` inversions, modulo
 * 10⁹ + 7.
 *
 * Build the permutation by relative order: the i-th element can land
 * anywhere among the first i, adding 0 to i inversions. So the counts for
 * prefix i + 1 are windowed sums of those for prefix i, done with running
 * sums. After a constrained prefix, keep only its required count.
 *
 * @see https://leetcode.com/problems/count-the-number-of-inversions/
 * @difficulty Hard
 * @timeComplexity O(n · C), for inversion counts up to C
 * @spaceComplexity O(n + C)
 *
 * @example
 * countTheNumberOfInversions(3, [[2, 2], [0, 0]]); // 2
 */
export const countTheNumberOfInversions = (
	n: number,
	requirements: readonly (readonly number[])[],
): number => {
	const required = new Map(
		requirements.map(([end = 0, count = 0]) => [end, count]),
	);
	const cap = Math.max(
		...requirements.map((requirement) => requirement[1] ?? 0),
	);
	let ways = new Array<number>(cap + 1).fill(0);
	ways[0] = 1;
	for (let i = 0; i < n; i++) {
		const next = new Array<number>(cap + 1).fill(0);
		let window = 0;
		for (let c = 0; c <= cap; c++) {
			window = (window + (ways[c] ?? 0)) % MOD;
			if (c - i - 1 >= 0)
				window = (window - (ways[c - i - 1] ?? 0) + MOD) % MOD;
			next[c] = window;
		}
		const count = required.get(i);
		if (count !== undefined)
			for (let c = 0; c <= cap; c++) if (c !== count) next[c] = 0;
		ways = next;
	}
	return ways[required.get(n - 1) ?? 0] ?? 0;
};
