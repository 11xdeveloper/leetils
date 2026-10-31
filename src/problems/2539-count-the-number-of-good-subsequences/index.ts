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
 * 2539. Count the Number of Good Subsequences
 *
 * A subsequence is good if it's non-empty and every letter in it appears
 * the same number of times. Returns the number of good subsequences of
 * `s`, modulo 1e9 + 7.
 *
 * For each shared frequency `f`, every letter either sits out or chooses
 * `f` of its occurrences: multiply `1 + C(count, f)` across letters and
 * drop the empty choice.
 *
 * @see https://leetcode.com/problems/count-the-number-of-good-subsequences/
 * @difficulty Medium
 * @timeComplexity O(n log MOD)
 * @spaceComplexity O(n)
 *
 * @example
 * countTheNumberOfGoodSubsequences("aabb"); // 11
 */
export const countTheNumberOfGoodSubsequences = (s: string): number => {
	const counts = Array.from({ length: 26 }, () => 0);
	for (let i = 0; i < s.length; i++)
		counts[s.charCodeAt(i) - 97] = (counts[s.charCodeAt(i) - 97] ?? 0) + 1;

	const factorial = [1];
	for (let i = 1; i <= s.length; i++)
		factorial.push(multiply(factorial[i - 1] ?? 1, i));
	const inverse = factorial.map((f) => power(f, MOD - 2));
	const choose = (n: number, r: number): number =>
		multiply(factorial[n] ?? 1, multiply(inverse[r] ?? 1, inverse[n - r] ?? 1));

	let good = 0;
	for (let f = 1; f <= Math.max(...counts); f++) {
		let ways = 1;
		for (const count of counts)
			if (count >= f) ways = multiply(ways, 1 + choose(count, f));
		good = (good + ways - 1) % MOD;
	}
	return good;
};
