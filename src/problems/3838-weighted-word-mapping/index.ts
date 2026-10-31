/**
 * 3838. Weighted Word Mapping
 *
 * A word's weight sums its letters' `weights`. Maps each word's weight
 * mod 26 to a letter in reverse order (0 is z, 25 is a) and joins them.
 *
 * @see https://leetcode.com/problems/weighted-word-mapping/
 * @difficulty Easy
 * @timeComplexity O(L)
 * @spaceComplexity O(n)
 *
 * @example
 * weightedWordMapping(["a", "b", "c"], new Array(26).fill(1)); // "yyy"
 */
export const weightedWordMapping = (
	words: readonly string[],
	weights: readonly number[],
): string =>
	words
		.map((word) => {
			let weight = 0;
			for (let i = 0; i < word.length; i++)
				weight += weights[word.charCodeAt(i) - 97] ?? 0;
			return String.fromCharCode(122 - (weight % 26));
		})
		.join("");
