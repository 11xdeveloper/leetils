/**
 * 2276. Count Integers in Intervals
 *
 * Adds integer intervals and counts the integers covered by at least one.
 *
 * A dynamic segment tree over [1, 10^9] creates nodes only as intervals
 * split them, and stops descending into fully covered nodes.
 *
 * @see https://leetcode.com/problems/count-integers-in-intervals/
 * @difficulty Hard
 * @timeComplexity O(log C) amortised per add, O(1) per count
 * @spaceComplexity O(q log C)
 *
 * @example
 * const intervals = new CountIntegersInIntervals();
 * intervals.add(2, 3);
 * intervals.add(7, 10);
 * intervals.count(); // 6
 */
export class CountIntegersInIntervals {
	static readonly #LOW = 1;
	static readonly #HIGH = 1_000_000_000;
	readonly #left: number[] = [0];
	readonly #right: number[] = [0];
	readonly #covered: number[] = [0];

	add(left: number, right: number): void {
		this.#add(
			0,
			CountIntegersInIntervals.#LOW,
			CountIntegersInIntervals.#HIGH,
			left,
			right,
		);
	}

	count(): number {
		return this.#covered[0] ?? 0;
	}

	#add(
		node: number,
		lo: number,
		hi: number,
		left: number,
		right: number,
	): void {
		const size = hi - lo + 1;
		if ((this.#covered[node] ?? 0) === size) return;
		if (left <= lo && hi <= right) {
			this.#covered[node] = size;
			return;
		}
		const mid = Math.floor((lo + hi) / 2);
		const leftChild = this.#child(node, this.#left);
		const rightChild = this.#child(node, this.#right);
		if (left <= mid) this.#add(leftChild, lo, mid, left, right);
		if (right > mid) this.#add(rightChild, mid + 1, hi, left, right);
		this.#covered[node] =
			(this.#covered[leftChild] ?? 0) + (this.#covered[rightChild] ?? 0);
	}

	#child(node: number, side: number[]): number {
		const existing = side[node] ?? 0;
		if (existing) return existing;
		const created = this.#covered.length;
		this.#left.push(0);
		this.#right.push(0);
		this.#covered.push(0);
		side[node] = created;
		return created;
	}
}
