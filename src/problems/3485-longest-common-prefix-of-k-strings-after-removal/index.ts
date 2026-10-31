interface Trie {
	readonly children: Map<string, Trie>;
	count: number;
}

/**
 * 3485. Longest Common Prefix of K Strings After Removal
 *
 * For each word, remove it and return the longest common prefix that some
 * `k` of the remaining words share.
 *
 * In a trie counting words through each node, a prefix is shared by k
 * words when its count is at least k. Count those nodes per depth. Removing
 * a word only lowers counts along its own path, so walk it, drop the
 * depths it empties, read off the deepest depth left, and restore.
 *
 * @see https://leetcode.com/problems/longest-common-prefix-of-k-strings-after-removal/
 * @difficulty Hard
 * @timeComplexity O(L), for L letters in total
 * @spaceComplexity O(L)
 *
 * @example
 * longestCommonPrefixOfKStringsAfterRemoval(["jump", "run", "run", "jump", "run"], 2); // [3, 4, 4, 3, 4]
 */
export const longestCommonPrefixOfKStringsAfterRemoval = (
	words: readonly string[],
	k: number,
): number[] => {
	if (words.length - 1 < k) return words.map(() => 0);
	const root: Trie = { children: new Map(), count: words.length };
	for (const word of words) {
		let node = root;
		for (const letter of word) {
			let child = node.children.get(letter);
			if (!child) {
				child = { children: new Map(), count: 0 };
				node.children.set(letter, child);
			}
			child.count++;
			node = child;
		}
	}
	const atDepth: number[] = [0];
	const visit: [Trie, number][] = [[root, 0]];
	for (let i = 0; i < visit.length; i++) {
		const [node, depth] = visit[i] ?? [root, 0];
		for (const child of node.children.values())
			if (child.count >= k) {
				atDepth[depth + 1] = (atDepth[depth + 1] ?? 0) + 1;
				visit.push([child, depth + 1]);
			}
	}
	const deepest = atDepth.length - 1;
	return words.map((word) => {
		const lost: number[] = [];
		let node = root;
		[...word].forEach((letter, i) => {
			const child = node.children.get(letter);
			if (!child) return;
			if (child.count === k) {
				atDepth[i + 1] = (atDepth[i + 1] ?? 0) - 1;
				lost.push(i + 1);
			}
			node = child;
		});
		let depth = deepest;
		while (depth > 0 && (atDepth[depth] ?? 0) === 0) depth--;
		for (const d of lost) atDepth[d] = (atDepth[d] ?? 0) + 1;
		return depth;
	});
};
