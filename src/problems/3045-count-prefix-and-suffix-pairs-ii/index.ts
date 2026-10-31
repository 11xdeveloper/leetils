interface Trie {
	readonly children: Map<string, Trie>;
	count: number;
}

/**
 * 3045. Count Prefix and Suffix Pairs II
 *
 * Count the pairs `i < j` where `words[i]` is both a prefix and a suffix of
 * `words[j]`.
 *
 * A word is a prefix and suffix of another exactly when its pairs (k-th
 * letter, k-th letter from the end) match the other's first pairs. Insert
 * each word's sequence of pairs into a trie, counting how many words end at
 * each node, and before inserting, add up the counts along the way.
 *
 * @see https://leetcode.com/problems/count-prefix-and-suffix-pairs-ii/
 * @difficulty Hard
 * @timeComplexity O(L), for L letters in total
 * @spaceComplexity O(L)
 *
 * @example
 * countPrefixAndSuffixPairsII(["a", "aba", "ababa", "aa"]); // 4
 */
export const countPrefixAndSuffixPairsII = (
	words: readonly string[],
): number => {
	const root: Trie = { children: new Map(), count: 0 };
	let pairs = 0;
	for (const word of words) {
		let node = root;
		for (let k = 0; k < word.length; k++) {
			const key = word.charAt(k) + word.charAt(word.length - 1 - k);
			let child = node.children.get(key);
			if (!child) {
				child = { children: new Map(), count: 0 };
				node.children.set(key, child);
			}
			node = child;
			pairs += node.count;
		}
		node.count++;
	}
	return pairs;
};
