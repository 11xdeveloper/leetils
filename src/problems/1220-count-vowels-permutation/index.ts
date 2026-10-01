/**
 * 1220. Count Vowels Permutation
 *
 * Counts the strings of `n` vowels where `a` is only followed by `e`, `e` by
 * `a` or `i`, `i` by anything but `i`, `o` by `i` or `u`, and `u` by `a`,
 * modulo 10^9 + 7.
 *
 * Dynamic programming over the last letter, one position at a time.
 *
 * @see https://leetcode.com/problems/count-vowels-permutation/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * countVowelsPermutation(5); // 68
 */
export const countVowelsPermutation = (n: number): number => {
	const MOD = 1_000_000_007;
	let [a, e, i, o, u] = [1, 1, 1, 1, 1];
	for (let length = 1; length < n; length++) {
		[a, e, i, o, u] = [
			(e + i + u) % MOD,
			(a + i) % MOD,
			(e + o) % MOD,
			i,
			(i + o) % MOD,
		];
	}
	return (a + e + i + o + u) % MOD;
};
