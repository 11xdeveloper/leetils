/**
 * 2131. Longest Palindrome by Concatenating Two Letter Words
 *
 * Returns the length of the longest palindrome made by concatenating some
 * of the two-letter `words`, each used at most once.
 *
 * Pair each word with an unpaired copy of its reverse, adding 4 letters.
 * One unpaired doubled word such as "gg" can sit in the middle.
 *
 * @see https://leetcode.com/problems/longest-palindrome-by-concatenating-two-letter-words/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * longestPalindromeByConcatenatingTwoLetterWords(["lc", "cl", "gg"]); // 6
 */
export const longestPalindromeByConcatenatingTwoLetterWords = (
	words: readonly string[],
): number => {
	const unpaired = new Map<string, number>();
	let length = 0;
	for (const word of words) {
		const reverse = (word[1] ?? "") + (word[0] ?? "");
		const waiting = unpaired.get(reverse) ?? 0;
		if (waiting > 0) {
			unpaired.set(reverse, waiting - 1);
			length += 4;
		} else {
			unpaired.set(word, (unpaired.get(word) ?? 0) + 1);
		}
	}
	for (const [word, count] of unpaired) {
		if (count > 0 && word[0] === word[1]) return length + 2;
	}
	return length;
};
