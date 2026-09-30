/**
 * 1048. Longest String Chain
 *
 * A word is a predecessor of another if inserting one letter anywhere turns
 * it into the other. Returns the length of the longest chain of words from
 * `words`, each a predecessor of the next.
 *
 * Processing words from shortest to longest, each word's longest chain
 * ending with it extends the best chain among the words formed by deleting
 * one of its letters.
 *
 * @see https://leetcode.com/problems/longest-string-chain/
 * @difficulty Medium
 * @timeComplexity O(n log n + n · L^2)
 * @spaceComplexity O(n)
 *
 * @example
 * longestStringChain(["a", "b", "ba", "bca", "bda", "bdca"]); // 4
 */
export const longestStringChain = (words: readonly string[]): number => {
	const chain = new Map<string, number>();
	let longest = 0;
	for (const word of words.toSorted((a, b) => a.length - b.length)) {
		let best = 1;
		for (let i = 0; i < word.length; i++)
			best = Math.max(
				best,
				(chain.get(word.slice(0, i) + word.slice(i + 1)) ?? 0) + 1,
			);
		chain.set(word, best);
		longest = Math.max(longest, best);
	}
	return longest;
};
