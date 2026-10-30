/**
 * 2981. Find Longest Special Substring That Occurs Thrice I
 *
 * A special string repeats a single letter. Returns the length of the
 * longest special substring occurring at least three times in `s`, or
 * -1.
 *
 * Count every special substring: each run of a letter of length `r`
 * contains `r - L + 1` of length `L`.
 *
 * @see https://leetcode.com/problems/find-longest-special-substring-that-occurs-thrice-i/
 * @difficulty Medium
 * @timeComplexity O(n²)
 * @spaceComplexity O(n)
 *
 * @example
 * findLongestSpecialSubstringThatOccursThriceI("aaaa"); // 2
 */
export const findLongestSpecialSubstringThatOccursThriceI = (
	s: string,
): number => {
	const counts = new Map<string, number>();
	for (let start = 0; start < s.length; ) {
		let end = start;
		while (end < s.length && s.charAt(end) === s.charAt(start)) end++;
		const run = end - start;
		for (let length = 1; length <= run; length++) {
			const key = `${s.charAt(start)}${length}`;
			counts.set(key, (counts.get(key) ?? 0) + run - length + 1);
		}
		start = end;
	}
	let best = -1;
	for (const [key, count] of counts)
		if (count >= 3) best = Math.max(best, Number(key.slice(1)));
	return best;
};
