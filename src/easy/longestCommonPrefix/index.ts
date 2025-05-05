/**
 * Write a function to find the longest common prefix string amongst an array of strings.
 * If there is no common prefix, return an empty string "".
 *
 * @param words - Array of strings to find common prefix from
 * @returns The longest common prefix string
 *
 * @example
 * Input: words = ["flower","flow","flight"]
 * Output: "fl"
 * Explanation: "fl" is the longest common prefix among all strings
 *
 * @example
 * Input: words = ["dog","racecar","car"]
 * Output: ""
 * Explanation: There is no common prefix among the input strings
 *
 * @example
 * Input: words = ["interspecies","interstellar","interstate"]
 * Output: "inters"
 *
 * @timeComplexity O(S) - where S is the sum of all characters in all strings
 * @spaceComplexity O(1) - only storing the prefix string
 */
export const longestCommonPrefix = (words: string[]): string => {
	if (words.length === 0) return "";
	if (words.length < 2) return words[0]!;

	const minLen = words.reduce(
		(min, word) => Math.min(min, word.length),
		Number.POSITIVE_INFINITY,
	);

	if (minLen === 0) return "";

	for (let i = minLen; i > 0; i--) {
		const prefix = words[0]!.slice(0, i);
		if (words.every((str) => str.slice(0, i) === prefix)) return prefix;
	}

	return "";
};
