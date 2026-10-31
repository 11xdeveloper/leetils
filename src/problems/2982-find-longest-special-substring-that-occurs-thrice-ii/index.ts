/**
 * 2982. Find Longest Special Substring That Occurs Thrice II
 *
 * A special string repeats a single letter. Returns the length of the
 * longest special substring occurring at least three times in `s`, or
 * -1, for strings too long to count every length.
 *
 * Only each letter's three longest runs `a >= b >= c` matter: the best
 * is `a - 2` from the longest alone, `min(a - 1, b)` from the top two, or
 * `c` from all three.
 *
 * @see https://leetcode.com/problems/find-longest-special-substring-that-occurs-thrice-ii/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(26)
 *
 * @example
 * findLongestSpecialSubstringThatOccursThriceII("abcaba"); // 1
 */
export const findLongestSpecialSubstringThatOccursThriceII = (
	s: string,
): number => {
	const top = Array.from({ length: 26 }, () => [0, 0, 0]);
	for (let start = 0; start < s.length; ) {
		let end = start;
		while (end < s.length && s.charAt(end) === s.charAt(start)) end++;
		const runs = top[s.charCodeAt(start) - 97] ?? [];
		runs.push(end - start);
		runs.sort((x, y) => y - x);
		runs.length = 3;
		start = end;
	}
	let best = 0;
	for (const [a = 0, b = 0, c = 0] of top)
		best = Math.max(best, a - 2, Math.min(a - 1, b), c);
	return best > 0 ? best : -1;
};
