/**
 * 642. Design Search Autocomplete System
 *
 * Built from past sentences and how many times each was typed. As a user
 * types a sentence one character at a time, `input` returns the three
 * hottest past sentences starting with what they've typed so far (most
 * typed first, ties in ASCII order). Typing `#` ends the sentence, records
 * it as typed once more, and returns nothing.
 *
 * Keeps the counts in a map. While a sentence is being typed, it narrows
 * the list of matching sentences by one character each time, then picks
 * the top three in a single pass rather than sorting.
 *
 * @see https://leetcode.com/problems/design-search-autocomplete-system/
 * @difficulty Hard
 * @timeComplexity O(s) per character for s matching sentences
 * @spaceComplexity O(total length of the sentences)
 *
 * @example
 * const system = new DesignSearchAutocompleteSystem(["i love you", "island", "iroman", "i love leetcode"], [5, 3, 2, 2]);
 * system.input("i"); // ["i love you", "island", "i love leetcode"]
 */
export class DesignSearchAutocompleteSystem {
	readonly #counts = new Map<string, number>();
	#typed = "";
	#matches: string[] | undefined;

	constructor(sentences: readonly string[], times: readonly number[]) {
		for (const [i, sentence] of sentences.entries()) {
			this.#counts.set(
				sentence,
				(this.#counts.get(sentence) ?? 0) + (times[i] ?? 0),
			);
		}
	}

	input(c: string): string[] {
		if (c === "#") {
			this.#counts.set(this.#typed, (this.#counts.get(this.#typed) ?? 0) + 1);
			this.#typed = "";
			this.#matches = undefined;
			return [];
		}

		const position = this.#typed.length;
		this.#typed += c;
		this.#matches = (this.#matches ?? [...this.#counts.keys()]).filter(
			(sentence) => sentence.charAt(position) === c,
		);

		const hotter = (a: string, b: string): boolean => {
			const difference =
				(this.#counts.get(a) ?? 0) - (this.#counts.get(b) ?? 0);
			return difference > 0 || (difference === 0 && a < b);
		};
		const top: string[] = [];
		for (const sentence of this.#matches) {
			let at = top.length;
			while (at > 0 && hotter(sentence, top[at - 1] ?? "")) at--;
			if (at < 3) top.splice(at, 0, sentence);
			if (top.length > 3) top.pop();
		}
		return top;
	}
}
