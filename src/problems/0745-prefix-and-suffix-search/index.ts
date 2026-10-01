/**
 * 745. Prefix and Suffix Search
 *
 * Built from a list of words, `f(pref, suff)` returns the largest index of
 * a word starting with `pref` and ending with `suff`, or -1 if there's
 * none.
 *
 * Words are short (at most 7 letters), so it stores every combination of a
 * suffix and a prefix of every word, mapped to the word's index; later
 * words overwrite earlier ones.
 *
 * @see https://leetcode.com/problems/prefix-and-suffix-search/
 * @difficulty Hard
 * @timeComplexity O(n · L^3) to build for words of length L, O(L) per query
 * @spaceComplexity O(n · L^3)
 *
 * @example
 * const filter = new PrefixAndSuffixSearch(["apple"]);
 * filter.f("a", "e"); // 0
 */
export class PrefixAndSuffixSearch {
	readonly #indexOf = new Map<string, number>();

	constructor(words: readonly string[]) {
		for (const [index, word] of words.entries()) {
			for (let p = 0; p <= word.length; p++) {
				for (let s = 0; s <= word.length; s++)
					this.#indexOf.set(`${word.slice(0, p)}#${word.slice(s)}`, index);
			}
		}
	}

	f(pref: string, suff: string): number {
		return this.#indexOf.get(`${pref}#${suff}`) ?? -1;
	}
}
