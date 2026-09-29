/**
 * 346. Moving Average from Data Stream
 *
 * Accepts a stream of integers and returns the average of the last `size`
 * values after each one.
 *
 * Keeps the window in a circular buffer with a running sum: each new value
 * replaces the oldest one, adjusting the sum, so every call is O(1).
 *
 * @see https://leetcode.com/problems/moving-average-from-data-stream/
 * @difficulty Easy
 * @timeComplexity O(1) per call
 * @spaceComplexity O(size)
 *
 * @example
 * const average = new MovingAverageFromDataStream(3);
 * average.next(1); // 1
 * average.next(10); // 5.5
 * average.next(3); // 4.666…
 * average.next(5); // 6
 */
export class MovingAverageFromDataStream {
	readonly #window: number[];
	#count = 0;
	#sum = 0;

	constructor(size: number) {
		this.#window = new Array<number>(size).fill(0);
	}

	next(val: number): number {
		const slot = this.#count % this.#window.length;
		this.#sum += val - (this.#window[slot] ?? 0);
		this.#window[slot] = val;
		this.#count++;
		return this.#sum / Math.min(this.#count, this.#window.length);
	}
}
