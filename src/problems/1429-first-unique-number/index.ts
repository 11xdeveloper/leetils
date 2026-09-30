/**
 * 1429. First Unique Number
 *
 * A queue of integers supporting `add(value)` and `showFirstUnique()`, the
 * earliest value that appears only once so far (or -1).
 *
 * Keeps a count per value and the values in order of arrival. The front
 * pointer only moves forwards past values that have become duplicates,
 * so each call is amortised constant time.
 *
 * @see https://leetcode.com/problems/first-unique-number/
 * @difficulty Medium
 * @timeComplexity O(1) amortised per operation
 * @spaceComplexity O(n)
 *
 * @example
 * const queue = new FirstUniqueNumber([2, 3, 5]);
 * queue.add(2);
 * queue.showFirstUnique(); // 3
 */
export class FirstUniqueNumber {
	readonly #counts = new Map<number, number>();
	readonly #order: number[] = [];
	#front = 0;

	constructor(nums: readonly number[]) {
		for (const num of nums) this.add(num);
	}

	showFirstUnique(): number {
		while (
			this.#front < this.#order.length &&
			this.#counts.get(this.#order[this.#front] ?? 0) !== 1
		) {
			this.#front++;
		}
		return this.#order[this.#front] ?? -1;
	}

	add(value: number): void {
		const count = (this.#counts.get(value) ?? 0) + 1;
		this.#counts.set(value, count);
		if (count === 1) this.#order.push(value);
	}
}
