/**
 * 1416. Restore The Array
 *
 * Counts the ways to split the digit string `s` into numbers from 1 to `k`
 * without leading zeros, modulo 10^9 + 7.
 *
 * Dynamic programming from the end: `ways[i]` counts splits of `s[i …]`. A
 * number starting at `i` (not with 0) can take up to as many digits as `k`
 * has, while it stays at most `k`.
 *
 * @see https://leetcode.com/problems/restore-the-array/
 * @difficulty Hard
 * @timeComplexity O(n log k)
 * @spaceComplexity O(n)
 *
 * @example
 * restoreTheArray("1317", 2000); // 8
 */
export const restoreTheArray = (s: string, k: number): number => {
	const MOD = 1_000_000_007;
	const n = s.length;
	const ways = new Array<number>(n + 1).fill(0);
	ways[n] = 1;
	for (let i = n - 1; i >= 0; i--) {
		if (s[i] === "0") continue;
		let [value, total] = [0, 0];
		for (let j = i; j < n; j++) {
			value = value * 10 + Number(s[j]);
			if (value > k) break;
			total = (total + (ways[j + 1] ?? 0)) % MOD;
		}
		ways[i] = total;
	}
	return ways[0] ?? 0;
};
