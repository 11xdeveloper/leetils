const MOD = 1_000_000_007;

/**
 * 2801. Count Stepping Numbers in Range
 *
 * A stepping number's neighbouring digits differ by exactly 1. Returns
 * how many stepping numbers lie between the decimal strings `low` and
 * `high` inclusive, modulo 1e9 + 7.
 *
 * Digit DP counting stepping numbers up to a bound by their last digit;
 * subtract the count up to `low` and add `low` back if it qualifies.
 *
 * @see https://leetcode.com/problems/count-stepping-numbers-in-range/
 * @difficulty Hard
 * @timeComplexity O(d · 10), where `d` is the number of digits
 * @spaceComplexity O(1)
 *
 * @example
 * countSteppingNumbersInRange("90", "101"); // 2
 */
export const countSteppingNumbersInRange = (
	low: string,
	high: string,
): number => {
	const stepping = (s: string): boolean =>
		[...s].every(
			(c, i) => i === 0 || Math.abs(Number(c) - Number(s.charAt(i - 1))) === 1,
		);

	/** Stepping numbers from 1 to `bound`. */
	const upTo = (bound: string): number => {
		// free[d]: numbers below the bound's prefix so far, already started, ending in d.
		let free = Array.from({ length: 10 }, () => 0);
		let tightOk = true;
		for (const [i, char] of [...bound].entries()) {
			const digit = Number(char);
			const next = Array.from({ length: 10 }, () => 0);
			for (let d = 0; d < 10; d++) {
				const ways = free[d] ?? 0;
				if (ways === 0) continue;
				for (const e of [d - 1, d + 1])
					if (e >= 0 && e <= 9) next[e] = ((next[e] ?? 0) + ways) % MOD;
			}
			// Numbers starting at this position, shorter than the bound.
			if (i > 0)
				for (let d = 1; d <= 9; d++) next[d] = ((next[d] ?? 0) + 1) % MOD;
			// Leaving the tight prefix with a smaller digit here.
			if (tightOk) {
				const previous = i === 0 ? -1 : Number(bound.charAt(i - 1));
				for (let d = i === 0 ? 1 : 0; d < digit; d++)
					if (i === 0 || Math.abs(d - previous) === 1)
						next[d] = ((next[d] ?? 0) + 1) % MOD;
				if (i > 0 && Math.abs(digit - previous) !== 1) tightOk = false;
			}
			free = next;
		}
		const total = free.reduce((sum, ways) => (sum + ways) % MOD, 0);
		return (total + (tightOk ? 1 : 0)) % MOD;
	};

	return (
		(((upTo(high) - upTo(low) + (stepping(low) ? 1 : 0)) % MOD) + MOD) % MOD
	);
};
