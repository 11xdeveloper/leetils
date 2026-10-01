/**
 * 1032. Stream of Characters
 *
 * Built from `words`, `query(letter)` adds a letter to a stream and returns
 * whether some word is a suffix of the stream so far.
 *
 * Stores the words reversed in a trie, and keeps the last few letters of
 * the stream (as many as the longest word). Each query walks the trie from
 * the newest letter backwards, stopping at the first complete word.
 *
 * @see https://leetcode.com/problems/stream-of-characters/
 * @difficulty Hard
 * @timeComplexity O(L) per query for words up to length L
 * @spaceComplexity O(total length of the words)
 *
 * @example
 * const stream = new StreamOfCharacters(["cd", "f", "kl"]);
 * ["a", "b", "c", "d"].map((letter) => stream.query(letter)); // [false, false, false, true]
 */
export class StreamOfCharacters {
	readonly #root: TrieNode = { children: new Map(), end: false };
	readonly #recent: string[] = [];
	readonly #longest: number;

	constructor(words: readonly string[]) {
		this.#longest = Math.max(0, ...words.map((word) => word.length));
		for (const word of words) {
			let node = this.#root;
			for (let i = word.length - 1; i >= 0; i--) {
				const char = word.charAt(i);
				let child = node.children.get(char);
				if (!child) {
					child = { children: new Map(), end: false };
					node.children.set(char, child);
				}
				node = child;
			}
			node.end = true;
		}
	}

	query(letter: string): boolean {
		this.#recent.push(letter);
		if (this.#recent.length > this.#longest) this.#recent.shift();
		let node: TrieNode | undefined = this.#root;
		for (let i = this.#recent.length - 1; i >= 0 && node; i--) {
			node = node.children.get(this.#recent[i] ?? "");
			if (node?.end) return true;
		}
		return false;
	}
}

interface TrieNode {
	children: Map<string, TrieNode>;
	end: boolean;
}
