/**
 * 1756. Design Most Recently Used Queue
 *
 * A queue of `1 … n` where `fetch(k)` moves the `k`-th element to the end
 * and returns it.
 *
 * Slots for the initial elements plus one per possible fetch, with a
 * Fenwick tree counting occupied slots. Finding the `k`-th element is a
 * descent through the tree; fetching empties its slot and fills the next
 * one at the end.
 *
 * @see https://leetcode.com/problems/design-most-recently-used-queue/
 * @difficulty Medium
 * @timeComplexity O(log(n + f)) per fetch, for f fetches
 * @spaceComplexity O(n + f)
 *
 * @example
 * const queue = new DesignMostRecentlyUsedQueue(8);
 * queue.fetch(3); // 3
 * queue.fetch(5); // 6
 */
export class DesignMostRecentlyUsedQueue {
	/** Enough room for the 2,000 fetches LeetCode allows. */
	static readonly #MAX_FETCHES = 2000;
	readonly #tree: number[];
	readonly #values: number[];
	#end: number;

	constructor(n: number) {
		const size = n + DesignMostRecentlyUsedQueue.#MAX_FETCHES;
		this.#tree = new Array<number>(size + 1).fill(0);
		this.#values = new Array<number>(size + 1).fill(0);
		for (let slot = 1; slot <= n; slot++) {
			this.#values[slot] = slot;
			this.#add(slot, 1);
		}
		this.#end = n;
	}

	fetch(k: number): number {
		// Descend the Fenwick tree to the slot where the k-th occupied slot is.
		let [slot, rest] = [0, k];
		for (
			let step = 2 ** Math.floor(Math.log2(this.#tree.length - 1));
			step > 0;
			step >>= 1
		) {
			const next = slot + step;
			if (next < this.#tree.length && (this.#tree[next] ?? 0) < rest) {
				slot = next;
				rest -= this.#tree[next] ?? 0;
			}
		}
		slot++;
		const value = this.#values[slot] ?? 0;
		this.#add(slot, -1);
		this.#end++;
		this.#values[this.#end] = value;
		this.#add(this.#end, 1);
		return value;
	}

	#add(slot: number, change: number): void {
		for (let i = slot; i < this.#tree.length; i += i & -i)
			this.#tree[i] = (this.#tree[i] ?? 0) + change;
	}
}
