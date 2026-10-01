/**
 * 1839. Longest Substring Of All Vowels in Order
 *
 * A beautiful string uses all five vowels in alphabetical order (each
 * vowel's copies together). Returns the longest beautiful substring of the
 * vowel string `word`, or 0.
 *
 * Track the current run of non-decreasing vowels and how many distinct
 * vowels it has used; restart whenever the order breaks.
 *
 * @see https://leetcode.com/problems/longest-substring-of-all-vowels-in-order/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * longestSubstringOfAllVowelsInOrder("aeiaaioaaaaeiiiiouuuooaauuaeiu"); // 13
 */
export const longestSubstringOfAllVowelsInOrder = (word: string): number => {
	let [best, length, distinct] = [0, 0, 0];
	for (let i = 0; i < word.length; i++) {
		const [char, previous] = [word[i] ?? "", word[i - 1] ?? ""];
		if (i > 0 && char >= previous) {
			length++;
			if (char > previous) distinct++;
		} else {
			[length, distinct] = [1, 1];
		}
		if (distinct === 5 && word[i - length + 1] === "a")
			best = Math.max(best, length);
	}
	return best;
};
