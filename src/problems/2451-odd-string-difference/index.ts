/**
 * 2451. Odd String Difference
 *
 * A word's difference array holds the alphabet gaps between consecutive
 * letters. All words but one share a difference array; returns the odd one
 * out.
 *
 * Compare difference arrays as keys.
 *
 * @see https://leetcode.com/problems/odd-string-difference/
 * @difficulty Easy
 * @timeComplexity O(n · m)
 * @spaceComplexity O(n · m)
 *
 * @example
 * oddStringDifference(["adc", "wzy", "abc"]); // "abc"
 */
export const oddStringDifference = (words: readonly string[]): string => {
	const key = (word: string): string =>
		Array.from(
			word.slice(1),
			(_, i) => word.charCodeAt(i + 1) - word.charCodeAt(i),
		).join(",");
	const keys = words.map(key);
	return (
		words.find(
			(_, i) => keys.indexOf(keys[i] ?? "") === keys.lastIndexOf(keys[i] ?? ""),
		) ?? ""
	);
};
