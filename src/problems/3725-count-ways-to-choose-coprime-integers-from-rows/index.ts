const MOD = 1_000_000_007;

/**
 * 3725. Count Ways to Choose Coprime Integers from Rows
 *
 * Pick one number from each row of `mat` so that all picks have gcd 1.
 * Counts the ways, modulo 1e9+7.
 *
 * Count choices so far by their gcd, folding in one row at a time.
 *
 * @see https://leetcode.com/problems/count-ways-to-choose-coprime-integers-from-rows/
 * @difficulty Hard
 * @timeComplexity O(m · (n + V²) · log V)
 * @spaceComplexity O(V)
 *
 * @example
 * countWaysToChooseCoprimeIntegersFromRows([[1, 2], [3, 4]]); // 3
 */
export const countWaysToChooseCoprimeIntegersFromRows = (
	mat: readonly (readonly number[])[],
): number => {
	const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
	const limit = Math.max(...mat.flat());
	// ways[g]: choices so far with gcd g; index 0 means nothing chosen yet.
	let ways = new Array<number>(limit + 1).fill(0);
	ways[0] = 1;
	for (const row of mat) {
		const counts = new Map<number, number>();
		for (const x of row) counts.set(x, (counts.get(x) ?? 0) + 1);
		const next = new Array<number>(limit + 1).fill(0);
		ways.forEach((count, g) => {
			if (!count) return;
			for (const [x, times] of counts) {
				const h = gcd(g, x);
				next[h] = ((next[h] ?? 0) + ((count * times) % MOD)) % MOD;
			}
		});
		ways = next;
	}
	return ways[1] ?? 0;
};
