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
 * 2514. Count Anagrams
 *
 * An anagram of a sentence permutes the letters of each word in place.
 * Returns the number of distinct anagrams of `s`, modulo 1e9 + 7.
 *
 * Multiply each word's count of distinct arrangements: its length
 * factorial over the factorial of each letter's count.
 *
 * @see https://leetcode.com/problems/count-anagrams/
 * @difficulty Hard
 * @timeComplexity O(n + log MOD)
 * @spaceComplexity O(n)
 *
 * @example
 * countAnagrams("too hot"); // 18
 */
export const countAnagrams = (s: string): number => {
	const factorial = [1];
	for (let i = 1; i <= s.length; i++)
		factorial.push(multiply(factorial[i - 1] ?? 1, i));

	let numerator = 1;
	let denominator = 1;
	for (const word of s.split(" ")) {
		numerator = multiply(numerator, factorial[word.length] ?? 1);
		const counts = Array.from({ length: 26 }, () => 0);
		for (let i = 0; i < word.length; i++)
			counts[word.charCodeAt(i) - 97] =
				(counts[word.charCodeAt(i) - 97] ?? 0) + 1;
		for (const count of counts)
			denominator = multiply(denominator, factorial[count] ?? 1);
	}
	return multiply(numerator, power(denominator, MOD - 2));
};
