/**
 * 44. Wildcard Matching
 *
 * Returns whether the pattern `p` matches all of `s`, where `?` matches any
 * single character and `*` matches any sequence of characters, including
 * none.
 *
 * Matches greedily, remembering the most recent `*`. On a mismatch, it goes
 * back and lets that `*` absorb one more character. Only the most recent
 * `*` needs revisiting: anything an earlier one could absorb, a later one
 * can too.
 *
 * @see https://leetcode.com/problems/wildcard-matching/
 * @difficulty Hard
 * @timeComplexity O(m * n) in the worst case, and usually close to O(m + n)
 * @spaceComplexity O(1)
 *
 * @example
 * wildcardMatching("aa", "a"); // false
 * wildcardMatching("aa", "*"); // true
 * wildcardMatching("cb", "?a"); // false
 */
export const wildcardMatching = (s: string, p: string): boolean => {
	let i = 0;
	let j = 0;
	let star = -1;
	let starMatchEnd = 0;

	while (i < s.length) {
		if (j < p.length && (p[j] === "?" || p[j] === s[i])) {
			i++;
			j++;
		} else if (j < p.length && p[j] === "*") {
			star = j;
			starMatchEnd = i;
			j++;
		} else if (star !== -1) {
			j = star + 1;
			starMatchEnd++;
			i = starMatchEnd;
		} else {
			return false;
		}
	}

	while (p[j] === "*") j++;
	return j === p.length;
};
