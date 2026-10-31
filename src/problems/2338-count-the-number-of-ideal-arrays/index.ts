/**
 * 2338. Count the Number of Ideal Arrays
 *
 * An ideal array of length `n` has values from 1 to `maxValue`, each
 * divisible by the one before. Counts them, modulo 10^9 + 7.
 *
 * An ideal array is a strictly increasing divisor chain (at most 14
 * values, since each at least doubles) stretched to length `n`; a chain of
 * `k` values stretches in `C(n - 1, k - 1)` ways. Count chains by length
 * with a sieve-style DP.
 *
 * @see https://leetcode.com/problems/count-the-number-of-ideal-arrays/
 * @difficulty Hard
 * @timeComplexity O(L · maxValue · log maxValue) for chains up to L = 14
 * @spaceComplexity O(L · maxValue)
 *
 * @example
 * countTheNumberOfIdealArrays(2, 5); // 10
 */
export const countTheNumberOfIdealArrays = (
	n: number,
	maxValue: number,
): number => {
	const MOD = 1_000_000_007;
	const maxLength = Math.min(n, Math.floor(Math.log2(maxValue)) + 1);
	// chains[v]: chains of the current length ending at v.
	let chains = new Array<number>(maxValue + 1).fill(1);
	chains[0] = 0;
	let total = 0n;
	let binomial = 1n; // C(n - 1, length - 1)
	for (let length = 1; length <= maxLength; length++) {
		const count = chains.reduce((sum, c) => (sum + c) % MOD, 0);
		total = (total + BigInt(count) * binomial) % BigInt(MOD);
		binomial = (binomial * BigInt(n - length)) / BigInt(length);
		const next = new Array<number>(maxValue + 1).fill(0);
		for (let v = 1; v <= maxValue; v++) {
			const c = chains[v] ?? 0;
			if (!c) continue;
			for (let multiple = 2 * v; multiple <= maxValue; multiple += v)
				next[multiple] = ((next[multiple] ?? 0) + c) % MOD;
		}
		chains = next;
	}
	return Number(total);
};
