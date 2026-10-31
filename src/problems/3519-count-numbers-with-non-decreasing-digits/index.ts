const MOD = 1_000_000_007;

/**
 * 3519. Count Numbers with Non-Decreasing Digits
 *
 * How many numbers from `l` to `r` (decimal strings of up to 100 digits)
 * have non-decreasing digits when written in base `b`, modulo 10⁹ + 7.
 *
 * Padding with leading zeros keeps digits non-decreasing, so count padded
 * digit strings up to a bound: convert the bound to base b with BigInt,
 * then digit dynamic programming over (position, previous digit) for the
 * strings that break below the bound, plus the bound itself if it counts.
 *
 * @see https://leetcode.com/problems/count-numbers-with-non-decreasing-digits/
 * @difficulty Hard
 * @timeComplexity O(L · b²), for L base-b digits
 * @spaceComplexity O(L · b)
 *
 * @example
 * countNumbersWithNonDecreasingDigits("23", "28", 8); // 3
 */
export const countNumbersWithNonDecreasingDigits = (
	l: string,
	r: string,
	b: number,
): number => {
	const upTo = (bound: bigint): number => {
		if (bound < 0n) return 0;
		const digits: number[] = [];
		for (let rest = bound; rest > 0n; rest /= BigInt(b))
			digits.unshift(Number(rest % BigInt(b)));
		if (digits.length === 0) digits.push(0);
		const length = digits.length;
		// free[i][d]: non-decreasing fillings of positions i.. given previous digit d.
		const free = Array.from({ length: length + 1 }, () =>
			new Array<number>(b).fill(0),
		);
		free[length]?.fill(1);
		for (let i = length - 1; i >= 0; i--)
			for (let d = b - 1; d >= 0; d--) {
				const row = free[i];
				if (row) row[d] = ((row[d + 1] ?? 0) + (free[i + 1]?.[d] ?? 0)) % MOD;
			}
		let total = 0;
		let previous = 0;
		for (let i = 0; i < length; i++) {
			const digit = digits[i] ?? 0;
			for (let d = previous; d < digit; d++)
				total = (total + (free[i + 1]?.[d] ?? 0)) % MOD;
			if (digit < previous) return total;
			previous = digit;
		}
		return (total + 1) % MOD;
	};
	return (upTo(BigInt(r)) - upTo(BigInt(l) - 1n) + MOD) % MOD;
};
