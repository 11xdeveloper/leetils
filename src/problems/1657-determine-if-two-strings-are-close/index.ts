/**
 * 1657. Determine if Two Strings Are Close
 *
 * Two strings are close if one becomes the other by swapping characters
 * and by swapping every occurrence of one letter for another. Returns
 * whether `word1` and `word2` are close.
 *
 * Swaps allow any order, and relabelling permutes the letter counts among
 * the letters present. So they are close exactly when they use the same
 * set of letters with the same multiset of counts.
 *
 * @see https://leetcode.com/problems/determine-if-two-strings-are-close/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * determineIfTwoStringsAreClose("cabbba", "abbccc"); // true
 */
export const determineIfTwoStringsAreClose = (
	word1: string,
	word2: string,
): boolean => {
	const countsOf = (word: string) => {
		const counts = new Array<number>(26).fill(0);
		for (let i = 0; i < word.length; i++)
			counts[word.charCodeAt(i) - 97] =
				(counts[word.charCodeAt(i) - 97] ?? 0) + 1;
		return counts;
	};
	const [a, b] = [countsOf(word1), countsOf(word2)];
	if (a.some((count, i) => count > 0 !== (b[i] ?? 0) > 0)) return false;
	const sortedA = a.toSorted((x, y) => x - y);
	return b.toSorted((x, y) => x - y).every((count, i) => count === sortedA[i]);
};
