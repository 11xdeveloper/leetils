import { Heap } from "../../internal/heap";

/**
 * 2336. Smallest Number in Infinite Set
 *
 * A set initially holding every positive integer supports popping the
 * smallest and adding numbers back.
 *
 * Everything from some point on is still present; numbers added back
 * below it sit in a min-heap (with a set to avoid duplicates).
 *
 * @see https://leetcode.com/problems/smallest-number-in-infinite-set/
 * @difficulty Medium
 * @timeComplexity O(log n) per operation
 * @spaceComplexity O(n)
 *
 * @example
 * const set = new SmallestNumberInInfiniteSet();
 * set.popSmallest(); // 1
 * set.addBack(1);
 * set.popSmallest(); // 1
 */
export class SmallestNumberInInfiniteSet {
	#next = 1;
	readonly #added = new Heap<number>((a, b) => a - b);
	readonly #inHeap = new Set<number>();

	popSmallest(): number {
		const smallest = this.#added.pop();
		if (smallest === undefined) return this.#next++;
		this.#inHeap.delete(smallest);
		return smallest;
	}

	addBack(num: number): void {
		if (num >= this.#next || this.#inHeap.has(num)) return;
		this.#inHeap.add(num);
		this.#added.push(num);
	}
}
