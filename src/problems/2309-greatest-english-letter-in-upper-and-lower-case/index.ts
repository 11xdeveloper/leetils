/**
 * 2309. Greatest English Letter in Upper and Lower Case
 *
 * Returns the greatest letter appearing in both cases in `s`, upper-cased,
 * or `""`.
 *
 * Try the letters from Z down.
 *
 * @see https://leetcode.com/problems/greatest-english-letter-in-upper-and-lower-case/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * greatestEnglishLetterInUpperAndLowerCase("arRAzFif"); // "R"
 */
export const greatestEnglishLetterInUpperAndLowerCase = (s: string): string => {
	const chars = new Set(s);
	for (let code = 90; code >= 65; code--) {
		const upper = String.fromCharCode(code);
		if (chars.has(upper) && chars.has(upper.toLowerCase())) return upper;
	}
	return "";
};
