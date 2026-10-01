interface TrieNode {
	children: Map<string, TrieNode>;
	isWord: boolean;
}

const createNode = (): TrieNode => ({ children: new Map(), isWord: false });

/**
 * 208. Implement Trie (Prefix Tree)
 *
 * A trie (prefix tree) of lowercase words: insert words, check whether a
 * word was inserted, and check whether any inserted word starts with a
 * prefix.
 *
 * Each node holds a child per next letter and a flag for whether a word ends
 * there. Every operation walks one node per letter.
 *
 * @see https://leetcode.com/problems/implement-trie-prefix-tree/
 * @difficulty Medium
 * @timeComplexity O(L) per operation, where L is the length of the word or prefix
 * @spaceComplexity O(total length of inserted words)
 *
 * @example
 * const trie = new ImplementTriePrefixTree();
 * trie.insert("apple");
 * trie.search("apple"); // true
 * trie.search("app"); // false
 * trie.startsWith("app"); // true
 */
export class ImplementTriePrefixTree {
	readonly #root: TrieNode = createNode();

	insert(word: string): void {
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

	/** Whether `word` was inserted. */
	search(word: string): boolean {
		return this.#find(word)?.isWord ?? false;
	}

	/** Whether any inserted word starts with `prefix`. */
	startsWith(prefix: string): boolean {
		return this.#find(prefix) !== undefined;
	}

	#find(prefix: string): TrieNode | undefined {
		let node: TrieNode | undefined = this.#root;
		for (const char of prefix) {
			node = node.children.get(char);
			if (!node) return undefined;
		}
		return node;
	}
}
