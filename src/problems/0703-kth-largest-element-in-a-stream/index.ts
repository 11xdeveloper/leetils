import { Heap } from "../../internal/heap";

/**
 * 703. Kth Largest Element in a Stream
 *
 * Built from `k` and some initial numbers, `add` adds a number to the
 * stream and returns the `k`th largest so far. There are always at least
 * `k` numbers once `add` is called.
 *
 * Keeps the `k` largest numbers in a min-heap, whose top is the answer.
 *
 * @see https://leetcode.com/problems/kth-largest-element-in-a-stream/
 * @difficulty Easy
 * @timeComplexity O(log k) per add
 * @spaceComplexity O(k)
 *
 * @example
 * const stream = new KthLargestElementInAStream(3, [4, 5, 8, 2]);
 * stream.add(3); // 4
 */
export class KthLargestElementInAStream {
	readonly #k: number;
	readonly #largest = new Heap<number>((a, b) => a - b);

	constructor(k: number, nums: readonly number[]) {
		this.#k = k;
		for (const num of nums) this.add(num);
	}

	add(val: number): number {
		this.#largest.push(val);
		if (this.#largest.size > this.#k) this.#largest.pop();
		return this.#largest.peek() ?? val;
	}
}
