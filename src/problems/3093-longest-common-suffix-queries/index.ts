interface Trie {
	readonly children: Map<string, Trie>;
	/** The best word passing through this node: shortest, then earliest. */
	best: number;
}

/**
 * 3093. Longest Common Suffix Queries
 *
 * For each query word, the index of the word in `wordsContainer` sharing
 * the longest common suffix with it. Ties go to the shortest word, then the
 * earliest.
 *
 * Insert the container words reversed into a trie, keeping at each node the
 * best word through it. A query walks down its reversed letters as far as
 * it can and takes that node's best.
 *
 * @see https://leetcode.com/problems/longest-common-suffix-queries/
 * @difficulty Hard
 * @timeComplexity O(L), for L letters in total
 * @spaceComplexity O(L)
 *
 * @example
 * longestCommonSuffixQueries(["abcd", "bcd", "xbcd"], ["cd", "bcd", "xyz"]); // [1, 1, 1]
 */
export const longestCommonSuffixQueries = (
	wordsContainer: readonly string[],
	wordsQuery: readonly string[],
): number[] => {
	const length = (i: number): number => wordsContainer[i]?.length ?? 0;
	const root: Trie = { children: new Map(), best: 0 };
	wordsContainer.forEach((word, index) => {
		if (length(index) < length(root.best)) root.best = index;
		let node = root;
		for (let i = word.length - 1; i >= 0; i--) {
			const letter = word.charAt(i);
			let child = node.children.get(letter);
			if (!child) {
				child = { children: new Map(), best: index };
				node.children.set(letter, child);
			} else if (length(index) < length(child.best)) child.best = index;
			node = child;
		}
	});
	return wordsQuery.map((query) => {
		let node = root;
		for (let i = query.length - 1; i >= 0; i--) {
			const child = node.children.get(query.charAt(i));
			if (!child) break;
			node = child;
		}
		return node.best;
	});
};
