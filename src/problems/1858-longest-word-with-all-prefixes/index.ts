/** A trie node marking whether a word ends here. */
interface TrieNode {
	children: Map<string, TrieNode>;
	isWord: boolean;
}

/**
 * 1858. Longest Word With All Prefixes
 *
 * Returns the longest word in `words` whose every prefix is also in
 * `words`, the lexicographically smallest on ties, or "".
 *
 * Put the words in a trie, then walk it (explicit stack) only through
 * nodes that end words: every node reached is a word with all prefixes.
 *
 * @see https://leetcode.com/problems/longest-word-with-all-prefixes/
 * @difficulty Medium
 * @timeComplexity O(L) for total length L
 * @spaceComplexity O(L)
 *
 * @example
 * longestWordWithAllPrefixes(["a", "banana", "app", "appl", "ap", "apply", "apple"]); // "apple"
 */
export const longestWordWithAllPrefixes = (
	words: readonly string[],
): string => {
	const root: TrieNode = { children: new Map(), isWord: true };
	for (const word of words) {
		let node = root;
		for (const char of word) {
			let child = node.children.get(char);
			if (!child) {
				child = { children: new Map(), isWord: false };
				node.children.set(char, child);
			}
			node = child;
		}
		node.isWord = true;
	}
	let best = "";
	const stack: [TrieNode, string][] = [[root, ""]];
	for (let entry = stack.pop(); entry; entry = stack.pop()) {
		const [node, word] = entry;
		if (
			word.length > best.length ||
			(word.length === best.length && word < best)
		)
			best = word;
		for (const [char, child] of node.children)
			if (child.isWord) stack.push([child, word + char]);
	}
	return best;
};
