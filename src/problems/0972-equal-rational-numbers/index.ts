/**
 * 972. Equal Rational Numbers
 *
 * Returns whether two decimal strings, possibly with a repeating part in
 * parentheses (`"0.1(6)"`), represent the same rational number.
 *
 * Converts each to an exact fraction with `BigInt`: the non-repeating part
 * over a power of ten, plus the repeating part over `99…9` scaled into
 * place. Cross-multiplying compares them.
 *
 * @see https://leetcode.com/problems/equal-rational-numbers/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * equalRationalNumbers("0.(52)", "0.5(25)"); // true
 */
export const equalRationalNumbers = (s: string, t: string): boolean => {
	const toFraction = (
		text: string,
	): [numerator: bigint, denominator: bigint] => {
		const [, whole = "0", fixed = "", repeating = ""] =
			text.match(/^(\d+)\.?(\d*)(?:\((\d+)\))?$/) ?? [];
		const scale = 10n ** BigInt(fixed.length);
		let numerator = BigInt(whole) * scale + BigInt(fixed || "0");
		let denominator = scale;
		if (repeating !== "") {
			const cycle = 10n ** BigInt(repeating.length) - 1n;
			numerator = numerator * cycle + BigInt(repeating);
			denominator *= cycle;
		}
		return [numerator, denominator];
	};
	const [a, b] = toFraction(s);
	const [c, d] = toFraction(t);
	return a * d === c * b;
};
