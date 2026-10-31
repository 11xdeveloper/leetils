/**
 * 3407. Substring Matching Pattern
 *
 * Whether `p`, with exactly one `*` standing for any run of characters, can
 * match a substring of `s`.
 *
 * Find the earliest place for the part before the `*`, then look for the
 * part after it from there on.
 *
 * @see https://leetcode.com/problems/substring-matching-pattern/
 * @difficulty Easy
 * @timeComplexity O(n · m)
 * @spaceComplexity O(m)
 *
 * @example
 * substringMatchingPattern("leetcode", "ee*e"); // true
 */
export const substringMatchingPattern = (s: string, p: string): boolean => {
	const star = p.indexOf("*");
	const before = p.slice(0, star);
	const after = p.slice(star + 1);
	const start = s.indexOf(before);
	return start !== -1 && s.indexOf(after, start + before.length) !== -1;
};
