/**
 * 10. Regular Expression Matching
 *
 * Returns whether the pattern `p` matches all of `s`, where `.` matches any
 * single character and `*` matches zero or more of the preceding element.
 *
 * Dynamic programming over suffixes: whether `s` from `i` matches `p` from
 * `j` depends only on later suffixes. For `x*`, either skip it or, if `x`
 * matches `s[i]`, consume one character and keep the `x*`.
 *
 * @see https://leetcode.com/problems/regular-expression-matching/
 * @difficulty Hard
 * @timeComplexity O(m * n)
 * @spaceComplexity O(m * n)
 *
 * @example
 * regularExpressionMatching("aa", "a"); // false
 * regularExpressionMatching("aa", "a*"); // true
 * regularExpressionMatching("ab", ".*"); // true
 */
export const regularExpressionMatching = (s: string, p: string): boolean => {
	const width = p.length + 1;
	// matches[i * width + j] is 1 when s.slice(i) matches p.slice(j).
	const matches = new Uint8Array((s.length + 1) * width);
	const suffixMatches = (i: number, j: number): boolean =>
		matches[i * width + j] === 1;

	matches[s.length * width + p.length] = 1;

	for (let i = s.length; i >= 0; i--) {
		for (let j = p.length - 1; j >= 0; j--) {
			const firstMatches = i < s.length && (p[j] === "." || p[j] === s[i]);
			const result =
				p[j + 1] === "*"
					? suffixMatches(i, j + 2) || (firstMatches && suffixMatches(i + 1, j))
					: firstMatches && suffixMatches(i + 1, j + 1);
			matches[i * width + j] = result ? 1 : 0;
		}
	}

	return suffixMatches(0, 0);
};
