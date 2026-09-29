interface TrieNode {
	children: Map<string, TrieNode>;
	isWord: boolean;
}

const createNode = (): TrieNode => ({ children: new Map(), isWord: false });

/**
 * 211. Design Add and Search Words Data Structure
 *
 * A dictionary of lowercase words where a search pattern may use `.` to
 * match any single letter.
 *
 * Stores the words in a trie. A search follows the trie letter by letter,
 * trying every child at a `.`.
 *
 * @see https://leetcode.com/problems/design-add-and-search-words-data-structure/
 * @difficulty Medium
 * @timeComplexity O(L) to add; O(26^d * L) to search, where d is the number of dots
 * @spaceComplexity O(total length of added words)
 *
 * @example
 * const dictionary = new DesignAddAndSearchWordsDataStructure();
 * dictionary.addWord("bad");
 * dictionary.search(".ad"); // true
 * dictionary.search("b.."); // true
 * dictionary.search("pad"); // false
 */
export class DesignAddAndSearchWordsDataStructure {
	readonly #root: TrieNode = createNode();

	addWord(word: string): void {
		let node = this.#root;
		for (const char of word) {
			let child = node.children.get(char);
			if (!child) {
				child = createNode();
				node.children.set(char, child);
			}
			node = child;
		}
		node.isWord = true;
	}

	/** Whether any added word matches `word`, where `.` matches any letter. */
	search(word: string): boolean {
		const matches = (node: TrieNode, i: number): boolean => {
			if (i === word.length) return node.isWord;
			const char = word.charAt(i);
			if (char !== ".") {
				const child = node.children.get(char);
				return child !== undefined && matches(child, i + 1);
			}
			for (const child of node.children.values()) {
				if (matches(child, i + 1)) return true;
			}
			return false;
		};
		return matches(this.#root, 0);
	}
}
