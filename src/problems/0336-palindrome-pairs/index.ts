const isPalindrome = (s: string, start: number, end: number): boolean => {
	for (let i = start, j = end - 1; i < j; i++, j--)
		if (s[i] !== s[j]) return false;
	return true;
};

/**
 * 336. Palindrome Pairs
 *
 * Given distinct words, returns every pair of indices `[i, j]`, with
 * `i !== j`, where `words[i] + words[j]` is a palindrome.
 *
 * Maps each reversed word to its index. For `words[i] + words[j]` to be a
 * palindrome, one word must end (or begin) with the other reversed, and the
 * leftover part must itself be a palindrome. So each word is split at every
 * position: if one side is a palindrome and the reverse of the other side
 * is a word, that's a pair.
 *
 * @see https://leetcode.com/problems/palindrome-pairs/
 * @difficulty Hard
 * @timeComplexity O(n * k^2) where k is the length of the longest word
 * @spaceComplexity O(n * k)
 *
 * @example
 * palindromePairs(["abcd", "dcba", "lls", "s", "sssll"]); // [[0, 1], [1, 0], [3, 2], [2, 4]]
 */
export const palindromePairs = (words: readonly string[]): number[][] => {
	const reversedIndex = new Map(
		words.map((word, i) => [[...word].reverse().join(""), i]),
	);
	const pairs: number[][] = [];

	for (const [i, word] of words.entries()) {
		for (let cut = 0; cut <= word.length; cut++) {
			// word = prefix + suffix. If suffix is a palindrome, prefix + suffix + reverse(prefix) is too.
			if (isPalindrome(word, cut, word.length)) {
				const j = reversedIndex.get(word.slice(0, cut));
				if (j !== undefined && j !== i) pairs.push([i, j]);
			}
			// If prefix is a palindrome, reverse(suffix) + prefix + suffix is too. Skipping cut 0
			// avoids finding the whole-word match twice.
			if (cut > 0 && isPalindrome(word, 0, cut)) {
				const j = reversedIndex.get(word.slice(cut));
				if (j !== undefined && j !== i) pairs.push([j, i]);
			}
		}
	}

	return pairs;
};
