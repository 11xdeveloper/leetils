/**
 * 676. Implement Magic Dictionary
 *
 * After `buildDict` stores a list of distinct words, `search` returns
 * whether changing exactly one letter of the given word turns it into a
 * stored word.
 *
 * Indexes every stored word under each of its "wildcard" patterns, one
 * letter replaced by `*`. A search matches if one of its patterns belongs
 * to a stored word other than itself.
 *
 * @see https://leetcode.com/problems/implement-magic-dictionary/
 * @difficulty Medium
 * @timeComplexity O(L^2) per word to build and per search, for words of length L
 * @spaceComplexity O(total length^2 / word count), the patterns
 *
 * @example
 * const dictionary = new ImplementMagicDictionary();
 * dictionary.buildDict(["hello", "leetcode"]);
 * dictionary.search("hhllo"); // true
 */
export class ImplementMagicDictionary {
	readonly #byPattern = new Map<string, Set<string>>();

	buildDict(dictionary: readonly string[]): void {
		this.#byPattern.clear();
		for (const word of dictionary) {
			for (const pattern of this.#patterns(word)) {
				const words = this.#byPattern.get(pattern);
				if (words) words.add(word);
				else this.#byPattern.set(pattern, new Set([word]));
			}
		}
	}

	search(searchWord: string): boolean {
		return this.#patterns(searchWord).some((pattern) => {
			const words = this.#byPattern.get(pattern);
			return words !== undefined && (words.size > 1 || !words.has(searchWord));
		});
	}

	#patterns(word: string): string[] {
		return Array.from(
			{ length: word.length },
			(_, i) => `${word.slice(0, i)}*${word.slice(i + 1)}`,
		);
	}
}
