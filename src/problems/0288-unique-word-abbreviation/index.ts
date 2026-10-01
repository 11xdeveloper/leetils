/** A word's first letter, the number of letters between, and its last letter. */
const abbreviate = (word: string): string =>
	word.length <= 2 ? word : `${word[0]}${word.length - 2}${word.at(-1)}`;

/**
 * 288. Unique Word Abbreviation
 *
 * Built from a dictionary, answers whether a word's abbreviation is unique:
 * no dictionary word other than the word itself shares it. A word's
 * abbreviation is its first letter, how many letters are between, and its
 * last letter, like `"i18n"` for "internationalization".
 *
 * Maps each abbreviation to the one distinct dictionary word with it, or to
 * `null` when several distinct words share it. A query then checks the map
 * once.
 *
 * @see https://leetcode.com/problems/unique-word-abbreviation/
 * @difficulty Medium
 * @timeComplexity O(total length of the dictionary) to build, O(L) per query
 * @spaceComplexity O(n)
 *
 * @example
 * const abbreviations = new UniqueWordAbbreviation(["deer", "door", "cake", "card"]);
 * abbreviations.isUnique("dear"); // false: "deer" is also "d2r"
 * abbreviations.isUnique("cake"); // true
 */
export class UniqueWordAbbreviation {
	readonly #words = new Map<string, string | null>();

	constructor(dictionary: readonly string[]) {
		for (const word of dictionary) {
			const abbreviation = abbreviate(word);
			const existing = this.#words.get(abbreviation);
			this.#words.set(
				abbreviation,
				existing === undefined || existing === word ? word : null,
			);
		}
	}

	isUnique(word: string): boolean {
		const existing = this.#words.get(abbreviate(word));
		return existing === undefined || existing === word;
	}
}
