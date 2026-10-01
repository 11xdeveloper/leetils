/**
 * 1297. Maximum Number of Occurrences of a Substring
 *
 * Returns the most times any substring of `s` occurs (overlaps allowed)
 * among those with at most `maxLetters` distinct letters and a length from
 * `minSize` to `maxSize`.
 *
 * Every occurrence of a longer substring contains an occurrence of its
 * first `minSize` letters, which has no more distinct letters. So only
 * substrings of length `minSize` matter: slide a window of that length,
 * tracking its distinct letters, and count the qualifying ones.
 *
 * @see https://leetcode.com/problems/maximum-number-of-occurrences-of-a-substring/
 * @difficulty Medium
 * @timeComplexity O(n · minSize)
 * @spaceComplexity O(n · minSize)
 *
 * @example
 * maximumNumberOfOccurrencesOfASubstring("aababcaab", 2, 3, 4); // 2
 */
export const maximumNumberOfOccurrencesOfASubstring = (
	s: string,
	maxLetters: number,
	minSize: number,
	_maxSize: number,
): number => {
	const letters = new Map<string, number>();
	const counts = new Map<string, number>();
	let most = 0;
	for (let end = 0; end < s.length; end++) {
		const char = s[end] ?? "";
		letters.set(char, (letters.get(char) ?? 0) + 1);
		const start = end - minSize + 1;
		if (start > 0) {
			const leaving = s[start - 1] ?? "";
			const left = (letters.get(leaving) ?? 0) - 1;
			if (left === 0) letters.delete(leaving);
			else letters.set(leaving, left);
		}
		if (start < 0 || letters.size > maxLetters) continue;
		const sub = s.slice(start, end + 1);
		const count = (counts.get(sub) ?? 0) + 1;
		counts.set(sub, count);
		most = Math.max(most, count);
	}
	return most;
};
