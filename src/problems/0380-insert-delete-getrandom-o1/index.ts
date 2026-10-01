/**
 * 380. Insert Delete GetRandom O(1)
 *
 * A set of integers supporting insert, remove and picking a uniformly random
 * element, all in average O(1) time.
 *
 * Keeps the values in an array, for random picks by index, and a map from
 * each value to its index. Removing a value moves the last element into its
 * slot, so the array never has gaps. `random` is the source of randomness,
 * `Math.random` by default; passing a seeded one makes picks reproducible.
 *
 * @see https://leetcode.com/problems/insert-delete-getrandom-o1/
 * @difficulty Medium
 * @timeComplexity O(1) on average per operation
 * @spaceComplexity O(n)
 *
 * @example
 * const set = new InsertDeleteGetrandomO1();
 * set.insert(1); // true
 * set.insert(1); // false
 * set.getRandom(); // 1
 */
export class InsertDeleteGetrandomO1 {
	readonly #values: number[] = [];
	readonly #indexOf = new Map<number, number>();
	readonly #random: () => number;

	constructor(random: () => number = Math.random) {
		this.#random = random;
	}

	/** Adds `val` if absent; returns whether it was added. */
	insert(val: number): boolean {
		if (this.#indexOf.has(val)) return false;
		this.#indexOf.set(val, this.#values.length);
		this.#values.push(val);
		return true;
	}

	/** Removes `val` if present; returns whether it was removed. */
	remove(val: number): boolean {
		const index = this.#indexOf.get(val);
		if (index === undefined) return false;
		const last = this.#values.pop() ?? val;
		if (last !== val) {
			this.#values[index] = last;
			this.#indexOf.set(last, index);
		}
		this.#indexOf.delete(val);
		return true;
	}

	/** A uniformly random element. The set must not be empty. */
	getRandom(): number {
		return this.#values[Math.floor(this.#random() * this.#values.length)] ?? 0;
	}
}
