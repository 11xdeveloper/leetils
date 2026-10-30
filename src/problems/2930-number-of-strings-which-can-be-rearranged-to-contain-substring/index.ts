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
 * 2930. Number of Strings Which Can Be Rearranged to Contain Substring
 *
 * Returns how many lowercase strings of length `n` can be rearranged to
 * contain "leet", modulo 1e9 + 7.
 *
 * That needs an `l`, a `t` and two `e`s. Count the strings missing at
 * least one requirement by inclusion–exclusion over the three, and
 * subtract from `26ⁿ`.
 *
 * @see https://leetcode.com/problems/number-of-strings-which-can-be-rearranged-to-contain-substring/
 * @difficulty Medium
 * @timeComplexity O(log n)
 * @spaceComplexity O(1)
 *
 * @example
 * numberOfStringsWhichCanBeRearrangedToContainSubstring(4); // 12
 */
export const numberOfStringsWhichCanBeRearrangedToContainSubstring = (
	n: number,
): number => {
	/** Strings over `letters` letters, optionally with at most one extra `e`. */
	const strings = (letters: number, fewEs: boolean): number =>
		fewEs
			? (power(letters, n) + multiply(n, power(letters, n - 1))) % MOD
			: power(letters, n);
	const bad =
		2 * strings(25, false) +
		strings(25, true) -
		strings(24, false) -
		2 * strings(24, true) +
		strings(23, true);
	return (((power(26, n) - bad) % MOD) + 2 * MOD) % MOD;
};
