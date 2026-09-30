/**
 * 1153. String Transforms Into Another String
 *
 * A conversion changes every occurrence of one letter in `str1` to another
 * lowercase letter. Returns whether some sequence of conversions turns
 * `str1` into `str2`.
 *
 * Conversions only ever merge letters, so each letter of `str1` must always
 * line up with the same letter of `str2`. That's enough unless `str2` uses
 * all 26 letters: then there's no spare letter to break a cycle like
 * `a → b → a` through, and every conversion would lose a letter `str2`
 * needs.
 *
 * @see https://leetcode.com/problems/string-transforms-into-another-string/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(1), 26 letters
 *
 * @example
 * stringTransformsIntoAnotherString("aabcc", "ccdee"); // true
 */
export const stringTransformsIntoAnotherString = (
	str1: string,
	str2: string,
): boolean => {
	if (str1 === str2) return true;
	const mapping = new Map<string, string>();
	for (let i = 0; i < str1.length; i++) {
		const [from = "", to = ""] = [str1[i], str2[i]];
		const existing = mapping.get(from);
		if (existing !== undefined && existing !== to) return false;
		mapping.set(from, to);
	}
	return new Set(str2).size < 26;
};
