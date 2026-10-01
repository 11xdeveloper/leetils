interface TrieNode {
	children: Map<string, TrieNode>;
	word: string | undefined;
}

const createNode = (): TrieNode => ({ children: new Map(), word: undefined });

/**
 * 212. Word Search II
 *
 * Returns every word from `words` that can be spelled on the grid of letters
 * `board` by a path of horizontally or vertically adjacent cells, using each
 * cell at most once in a word.
 *
 * Puts the words in a trie, then searches from every cell, following the
 * trie as it goes, so all words sharing a prefix are searched together. A
 * found word is removed from the trie, and branches with nothing left under
 * them are pruned, so later searches skip them.
 *
 * @see https://leetcode.com/problems/word-search-ii/
 * @difficulty Hard
 * @timeComplexity O(m * n * 3^L) where L is the length of the longest word
 * @spaceComplexity O(total length of the words)
 *
 * @example
 * wordSearchII([["o", "a", "a", "n"], ["e", "t", "a", "e"], ["i", "h", "k", "r"], ["i", "f", "l", "v"]], ["oath", "pea", "eat", "rain"]);
 * // ["oath", "eat"]
 */
export const wordSearchII = (
	board: readonly (readonly string[])[],
	words: readonly string[],
): string[] => {
	const root = createNode();
	for (const word of words) {
		let node = root;
		for (const char of word) {
			let child = node.children.get(char);
			if (!child) {
				child = createNode();
				node.children.set(char, child);
			}
			node = child;
		}
		node.word = word;
	}

	const rows = board.length;
	const columns = board[0]?.length ?? 0;
	const used = new Uint8Array(rows * columns);
	const found: string[] = [];

	const search = (r: number, c: number, parent: TrieNode): void => {
		if (
			r < 0 ||
			r >= rows ||
			c < 0 ||
			c >= columns ||
			used[r * columns + c] === 1
		)
			return;
		const char = board[r]?.[c] ?? "";
		const node = parent.children.get(char);
		if (!node) return;

		if (node.word !== undefined) {
			found.push(node.word);
			node.word = undefined;
		}

		used[r * columns + c] = 1;
		search(r + 1, c, node);
		search(r - 1, c, node);
		search(r, c + 1, node);
		search(r, c - 1, node);
		used[r * columns + c] = 0;

		if (node.children.size === 0 && node.word === undefined)
			parent.children.delete(char);
	};

	for (let r = 0; r < rows; r++) {
		for (let c = 0; c < columns; c++) search(r, c, root);
	}

	return found;
};
