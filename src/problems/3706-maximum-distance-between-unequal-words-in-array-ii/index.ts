/**
 * 3706. Maximum Distance Between Unequal Words in Array II
 *
 * The largest j - i + 1 with `words[i]` and `words[j]` different, or 0.
 *
 * One end of a best pair can always be the first or last word: if
 * `words[i]` and `words[j]` differ, one of them differs from the first
 * word or from the last.
 *
 * @see https://leetcode.com/problems/maximum-distance-between-unequal-words-in-array-ii/
 * @difficulty Medium
 * @timeComplexity O(n · L)
 * @spaceComplexity O(1)
 *
 * @example
 * maximumDistanceBetweenUnequalWordsInArrayII(["a", "b", "c", "a", "a"]); // 4
 */
export const maximumDistanceBetweenUnequalWordsInArrayII = (
	words: readonly string[],
): number => {
	const n = words.length;
	let best = 0;
	words.forEach((word, i) => {
		if (word !== words[0]) best = Math.max(best, i + 1);
		if (word !== words[n - 1]) best = Math.max(best, n - i);
	});
	return best;
};
