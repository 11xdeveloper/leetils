/**
 * 3557. Find Maximum Number of Non Intersecting Substrings
 *
 * The most non-overlapping substrings of `word`, each at least four long
 * and starting and ending with the same letter.
 *
 * Greedily end a substring as early as possible: since the last cut,
 * remember each letter's first position, and cut at any letter seen at
 * least three places earlier.
 *
 * @see https://leetcode.com/problems/find-maximum-number-of-non-intersecting-substrings/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * findMaximumNumberOfNonIntersectingSubstrings("abcdeafdef"); // 2
 */
export const findMaximumNumberOfNonIntersectingSubstrings = (
	word: string,
): number => {
	let first = new Map<string, number>();
	let count = 0;
	for (let i = 0; i < word.length; i++) {
		const letter = word.charAt(i);
		const start = first.get(letter);
		if (start !== undefined && i - start >= 3) {
			count++;
			first = new Map();
		} else if (start === undefined) first.set(letter, i);
	}
	return count;
};
