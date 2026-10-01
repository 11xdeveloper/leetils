/** A trie node counting the words that pass through and end at it. */
interface TrieNode {
	children: Map<string, TrieNode>;
	passing: number;
	ending: number;
}

/**
 * 1804. Implement Trie II (Prefix Tree)
 *
 * A trie of words with duplicates, supporting insertion, erasing one copy,
 * and counting copies of a word or words with a given prefix.
 *
 * Each node counts the words passing through it and ending at it, so every
 * operation walks a single path.
 *
 * @see https://leetcode.com/problems/implement-trie-ii-prefix-tree/
 * @difficulty Medium
 * @timeComplexity O(L) per operation for word length L
 * @spaceComplexity O(total length inserted)
 *
 * @example
 * const trie = new ImplementTrieIIPrefixTree();
 * trie.insert("apple");
 * trie.insert("apple");
 * trie.countWordsStartingWith("app"); // 2
 */
export class ImplementTrieIIPrefixTree {
	readonly #root: TrieNode = { children: new Map(), passing: 0, ending: 0 };

	insert(word: string): void {
		let node = this.#root;
		node.passing++;
		for (const char of word) {
			let child = node.children.get(char);
			if (!child) {
				child = { children: new Map(), passing: 0, ending: 0 };
				node.children.set(char, child);
			}
			node = child;
			node.passing++;
		}
		node.ending++;
	}

	countWordsEqualTo(word: string): number {
		return this.#find(word)?.ending ?? 0;
	}

	countWordsStartingWith(prefix: string): number {
		return this.#find(prefix)?.passing ?? 0;
	}

	erase(word: string): void {
		if (!this.#find(word)?.ending) return;
		let node = this.#root;
		node.passing--;
		for (const char of word) {
			const child = node.children.get(char);
			if (!child) return;
			child.passing--;
			if (child.passing === 0) {
				node.children.delete(char);
				return;
			}
			node = child;
		}
		node.ending--;
	}

	#find(word: string): TrieNode | undefined {
		let node: TrieNode | undefined = this.#root;
		for (const char of word) node = node?.children.get(char);
		return node;
	}
}
