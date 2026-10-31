const MOD = 1_000_000_007;

/**
 * 3699. Number of ZigZag Arrays I
 *
 * Counts arrays of length `n` with values from `l` to `r` whose
 * neighbours always differ and alternate between going up and going
 * down, modulo 1e9+7.
 *
 * Count arrays by last value and last direction. Reflecting values swaps
 * the directions, so track only arrays ending with a rise: the next rise
 * to v follows a fall ending below v, which is a reflected rise ending
 * above the mirror of v. Prefix sums make each step linear.
 *
 * @see https://leetcode.com/problems/number-of-zigzag-arrays-i/
 * @difficulty Hard
 * @timeComplexity O(n · (r - l))
 * @spaceComplexity O(r - l)
 *
 * @example
 * numberOfZigzagArraysI(3, 1, 3); // 10
 */
export const numberOfZigzagArraysI = (
	n: number,
	l: number,
	r: number,
): number => {
	const m = r - l + 1;
	if (n === 1) return m % MOD;
	// rises[v]: arrays so far ending at value v with a rise.
	let rises = Array.from({ length: m }, (_, v) => v);
	for (let length = 3; length <= n; length++) {
		const next = new Array<number>(m).fill(0);
		// next[v] = Σ_{u < v} falls[u] = Σ_{u < v} rises[m - 1 - u].
		let running = 0;
		for (let v = 0; v < m; v++) {
			next[v] = running;
			running = (running + (rises[m - 1 - v] ?? 0)) % MOD;
		}
		rises = next;
	}
	return (2 * rises.reduce((a, b) => (a + b) % MOD, 0)) % MOD;
};
