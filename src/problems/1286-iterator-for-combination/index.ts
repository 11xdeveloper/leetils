/**
 * 1286. Iterator for Combination
 *
 * Iterates over the combinations of `combinationLength` letters from the
 * sorted, distinct `characters`, in lexicographic order, with `next()` and
 * `hasNext()`.
 *
 * Keeps the chosen indices. The next combination bumps the rightmost index
 * that still has room to move and resets everything after it to follow on
 * consecutively.
 *
 * @see https://leetcode.com/problems/iterator-for-combination/
 * @difficulty Medium
 * @timeComplexity O(k) per call for combinations of length k
 * @spaceComplexity O(k)
 *
 * @example
 * const combinations = new IteratorForCombination("abc", 2);
 * combinations.next(); // "ab"
 * combinations.next(); // "ac"
 * combinations.hasNext(); // true
 */
export class IteratorForCombination {
	readonly #characters: string;
	#indices: number[] | undefined;

	constructor(characters: string, combinationLength: number) {
		this.#characters = characters;
		this.#indices = Array.from({ length: combinationLength }, (_, i) => i);
	}

	next(): string {
		const indices = this.#indices ?? [];
		const combination = indices.map((i) => this.#characters[i] ?? "").join("");
		const [n, k] = [this.#characters.length, indices.length];
		let i = k - 1;
		while (i >= 0 && indices[i] === n - k + i) i--;
		if (i < 0) {
			this.#indices = undefined;
		} else {
			indices[i] = (indices[i] ?? 0) + 1;
			for (let j = i + 1; j < k; j++) indices[j] = (indices[j - 1] ?? 0) + 1;
		}
		return combination;
	}

	hasNext(): boolean {
		return this.#indices !== undefined;
	}
}
