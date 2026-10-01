/**
 * 903. Valid Permutations for DI Sequence
 *
 * `s[i]` is `"D"` or `"I"`, saying whether position `i + 1` of a permutation
 * of 0 to `n` (with `n = s.length`) is smaller or larger than position `i`.
 * Counts the permutations fitting `s`, modulo 10^9 + 7.
 *
 * Only the relative order of what's placed matters. `ways[j]` counts
 * arrangements of the first `i + 1` positions whose last element is the
 * `j`th smallest of them. The next element's rank is then above or at most
 * `j`, depending on the letter, which prefix sums add up quickly.
 *
 * @see https://leetcode.com/problems/valid-permutations-for-di-sequence/
 * @difficulty Hard
 * @timeComplexity O(n^2)
 * @spaceComplexity O(n)
 *
 * @example
 * validPermutationsForDiSequence("DID"); // 5
 */
export const validPermutationsForDiSequence = (s: string): number => {
	const MOD = 1_000_000_007;
	let ways = [1];
	for (const [i, letter] of [...s].entries()) {
		const size = i + 2;
		const next = new Array<number>(size).fill(0);
		if (letter === "I") {
			let running = 0;
			for (let rank = 0; rank < size; rank++) {
				next[rank] = running;
				running = (running + (ways[rank] ?? 0)) % MOD;
			}
		} else {
			let running = 0;
			for (let rank = size - 1; rank >= 0; rank--) {
				running = (running + (ways[rank] ?? 0)) % MOD;
				next[rank] = running;
			}
		}
		ways = next;
	}
	return ways.reduce((total, count) => (total + count) % MOD, 0);
};
