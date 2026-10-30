/**
 * 2744. Find Maximum Number of String Pairs
 *
 * Returns how many disjoint pairs of distinct two-letter words are each
 * other's reverse.
 *
 * Words are distinct, so each match pairs uniquely; count matches with a
 * set of words seen so far.
 *
 * @see https://leetcode.com/problems/find-maximum-number-of-string-pairs/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * findMaximumNumberOfStringPairs(["cd", "ac", "dc", "ca", "zz"]); // 2
 */
export const findMaximumNumberOfStringPairs = (
	words: readonly string[],
): number => {
	const seen = new Set<string>();
	let pairs = 0;
	for (const word of words) {
		if (seen.has(`${word.charAt(1)}${word.charAt(0)}`)) pairs++;
		seen.add(word);
	}
	return pairs;
};
