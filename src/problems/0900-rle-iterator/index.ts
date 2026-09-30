/**
 * 900. RLE Iterator
 *
 * Iterates over a run-length encoded sequence, where `encoding` holds pairs
 * `[count, value]`. `next(n)` skips `n` elements and returns the last one
 * skipped, or -1 if the sequence ran out.
 *
 * Keeps a pointer to the current pair and how much of it is used, jumping
 * whole runs at a time, so counts up to 10^9 are cheap.
 *
 * @see https://leetcode.com/problems/rle-iterator/
 * @difficulty Medium
 * @timeComplexity O(pairs) in total across all calls
 * @spaceComplexity O(1) beyond the encoding
 *
 * @example
 * const iterator = new RleIterator([3, 8, 0, 9, 2, 5]);
 * iterator.next(2); // 8
 * iterator.next(1); // 8
 * iterator.next(1); // 5
 */
export class RleIterator {
	readonly #encoding: readonly number[];
	#pair = 0;
	#used = 0;

	constructor(encoding: readonly number[]) {
		this.#encoding = encoding;
	}

	next(n: number): number {
		while (this.#pair < this.#encoding.length) {
			const remaining = (this.#encoding[this.#pair] ?? 0) - this.#used;
			if (n <= remaining) {
				this.#used += n;
				return this.#encoding[this.#pair + 1] ?? -1;
			}
			n -= remaining;
			this.#pair += 2;
			this.#used = 0;
		}
		return -1;
	}
}
