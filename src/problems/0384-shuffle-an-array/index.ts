/**
 * 384. Shuffle an Array
 *
 * Built from an array, returns uniformly random shuffles of it, and can
 * reset to the original order.
 *
 * The Fisher–Yates shuffle: each position, from the end backwards, swaps
 * with a random position at or before it. Every one of the n! orders is
 * equally likely. `random` is the source of randomness, `Math.random` by
 * default.
 *
 * @see https://leetcode.com/problems/shuffle-an-array/
 * @difficulty Medium
 * @timeComplexity O(n) per shuffle or reset
 * @spaceComplexity O(n)
 *
 * @example
 * const shuffler = new ShuffleAnArray([1, 2, 3]);
 * shuffler.shuffle(); // any order of 1, 2 and 3, each equally likely
 * shuffler.reset(); // [1, 2, 3]
 */
export class ShuffleAnArray {
	readonly #original: readonly number[];
	readonly #random: () => number;

	constructor(nums: readonly number[], random: () => number = Math.random) {
		this.#original = [...nums];
		this.#random = random;
	}

	reset(): number[] {
		return [...this.#original];
	}

	shuffle(): number[] {
		const shuffled = [...this.#original];
		for (let i = shuffled.length - 1; i > 0; i--) {
			const j = Math.floor(this.#random() * (i + 1));
			[shuffled[i], shuffled[j]] = [shuffled[j] ?? 0, shuffled[i] ?? 0];
		}
		return shuffled;
	}
}
