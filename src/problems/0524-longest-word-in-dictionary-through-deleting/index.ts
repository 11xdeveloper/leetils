/**
 * 524. Longest Word in Dictionary through Deleting
 *
 * Returns the longest word in `dictionary` that can be formed by deleting
 * characters from `s`, the lexicographically smallest if there's a tie, or
 * `""` if there's none.
 *
 * Checks each word with a two-pointer subsequence test, keeping the best
 * so far.
 *
 * @see https://leetcode.com/problems/longest-word-in-dictionary-through-deleting/
 * @difficulty Medium
 * @timeComplexity O(d · n) for d words and s of length n
 * @spaceComplexity O(1)
 *
 * @example
 * longestWordInDictionaryThroughDeleting("abpcplea", ["ale", "apple", "monkey", "plea"]); // "apple"
 */
export const longestWordInDictionaryThroughDeleting = (
	s: string,
	dictionary: readonly string[],
): string => {
	let best = "";

	for (const word of dictionary) {
		if (
			word.length < best.length ||
			(word.length === best.length && word >= best)
		)
			continue;
		let matched = 0;
		for (const char of s)
			if (matched < word.length && char === word.charAt(matched)) matched++;
		if (matched === word.length) best = word;
	}

	return best;
};
