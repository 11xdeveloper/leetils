/**
 * 604. Design Compressed String Iterator
 *
 * Iterates over a string given in compressed form, where each letter is
 * followed by how many times it repeats (`"L1e2t1"` is `"Leet"`). `next`
 * returns the next character, or a space once there are none left, and
 * `hasNext` says whether any remain.
 *
 * Parses the letters and counts up front, then walks through them, counting
 * down each letter's repeats. Counts can reach 10^9, so the string is never
 * expanded.
 *
 * @see https://leetcode.com/problems/design-compressed-string-iterator/
 * @difficulty Easy
 * @timeComplexity O(n) to build, O(1) per call
 * @spaceComplexity O(n)
 *
 * @example
 * const iterator = new DesignCompressedStringIterator("L1e2");
 * iterator.next(); // "L"
 * iterator.next(); // "e"
 */
export class DesignCompressedStringIterator {
	readonly #runs: [letter: string, count: number][];
	#index = 0;
	#used = 0;

	constructor(compressedString: string) {
		this.#runs = [...compressedString.matchAll(/([a-zA-Z])(\d+)/g)].map(
			([, letter = "", count = "0"]) => [letter, Number(count)],
		);
	}

	next(): string {
		if (!this.hasNext()) return " ";
		const [letter = " ", count = 0] = this.#runs[this.#index] ?? [];
		this.#used++;
		if (this.#used === count) {
			this.#index++;
			this.#used = 0;
		}
		return letter;
	}

	hasNext(): boolean {
		return this.#index < this.#runs.length;
	}
}
