/**
 * 1573. Number of Ways to Split a String
 *
 * Counts the ways to cut the binary string `s` into three non-empty parts
 * with equal numbers of 1s, modulo 10^9 + 7.
 *
 * With `t` ones per part, each cut can go anywhere in the run of 0s after
 * the `t`th (or `2t`th) one, so multiply the two choices. With no ones at
 * all, any two of the `n − 1` gaps work.
 *
 * @see https://leetcode.com/problems/number-of-ways-to-split-a-string/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * numberOfWaysToSplitAString("10101"); // 4
 */
export const numberOfWaysToSplitAString = (s: string): number => {
	const MOD = 1_000_000_007;
	const ones = [...s].flatMap((char, i) => (char === "1" ? [i] : []));
	const n = s.length;
	if (ones.length === 0)
		return Number(((BigInt(n - 1) * BigInt(n - 2)) / 2n) % BigInt(MOD));
	if (ones.length % 3 !== 0) return 0;
	const t = ones.length / 3;
	const first = (ones[t] ?? 0) - (ones[t - 1] ?? 0);
	const second = (ones[2 * t] ?? 0) - (ones[2 * t - 1] ?? 0);
	return (first * second) % MOD;
};
