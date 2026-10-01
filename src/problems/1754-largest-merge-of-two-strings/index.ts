/**
 * 1754. Largest Merge Of Two Strings
 *
 * Builds a string by repeatedly moving the first character of `word1` or
 * `word2` to the end of it. Returns the lexicographically largest result.
 *
 * Take from whichever remaining suffix is larger: when the next characters
 * tie, the rest of the strings decide which choice opens up the better
 * characters sooner.
 *
 * @see https://leetcode.com/problems/largest-merge-of-two-strings/
 * @difficulty Medium
 * @timeComplexity O((m + n)^2)
 * @spaceComplexity O(m + n)
 *
 * @example
 * largestMergeOfTwoStrings("cabaa", "bcaaa"); // "cbcabaaaaa"
 */
export const largestMergeOfTwoStrings = (
	word1: string,
	word2: string,
): string => {
	let [i, j] = [0, 0];
	const merge: string[] = [];
	while (i < word1.length || j < word2.length) {
		if (word1.slice(i) > word2.slice(j)) {
			merge.push(word1[i] ?? "");
			i++;
		} else {
			merge.push(word2[j] ?? "");
			j++;
		}
	}
	return merge.join("");
};
