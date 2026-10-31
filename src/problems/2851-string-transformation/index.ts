const MOD = 1_000_000_007;

const multiply = (a: number, b: number): number =>
	(((a * Math.floor(b / 65536)) % MOD) * 65536 + a * (b % 65536)) % MOD;

const power = (base: number, exponent: number): number => {
	let result = 1;
	for (; exponent > 0; exponent = Math.floor(exponent / 2)) {
		if (exponent % 2 === 1) result = multiply(result, base);
		base = multiply(base, base);
	}
	return result;
};

/**
 * 2851. String Transformation
 *
 * An operation moves a non-empty proper suffix of `s` to the front.
 * Returns the number of ways to turn `s` into `t` in exactly `k`
 * operations, modulo 1e9 + 7.
 *
 * Each operation rotates by a nonzero amount, so only the total rotation
 * modulo `n` matters. Sequences of `k` nonzero steps total 0 in
 * `((n-1)^k + (n-1)(-1)^k) / n` ways and any other given amount in
 * `((n-1)^k - (-1)^k) / n` ways. The Z-function finds which rotations of
 * `s` equal `t`.
 *
 * @see https://leetcode.com/problems/string-transformation/
 * @difficulty Hard
 * @timeComplexity O(n + log k)
 * @spaceComplexity O(n)
 *
 * @example
 * stringTransformation("abcd", "cdab", 2); // 2
 */
export const stringTransformation = (
	s: string,
	t: string,
	k: number,
): number => {
	const n = s.length;
	const text = `${t}#${s}${s.slice(0, -1)}`;
	const z = Array.from({ length: text.length }, () => 0);
	for (let i = 1, left = 0, right = 0; i < text.length; i++) {
		let length = i < right ? Math.min(right - i, z[i - left] ?? 0) : 0;
		while (
			i + length < text.length &&
			text.charAt(length) === text.charAt(i + length)
		)
			length++;
		z[i] = length;
		if (i + length > right) {
			left = i;
			right = i + length;
		}
	}
	let zeroShift = 0;
	let otherShifts = 0;
	for (let shift = 0; shift < n; shift++)
		if ((z[n + 1 + shift] ?? 0) >= n) {
			if (shift === 0) zeroShift++;
			else otherShifts++;
		}

	const inverseN = power(n, MOD - 2);
	const steps = power(n - 1, k);
	const sign = k % 2 === 0 ? 1 : MOD - 1;
	const toZero = multiply((steps + multiply(n - 1, sign)) % MOD, inverseN);
	const toOther = multiply((steps - sign + MOD) % MOD, inverseN);
	return (multiply(zeroShift, toZero) + multiply(otherShifts, toOther)) % MOD;
};
