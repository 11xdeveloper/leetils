/**
 * 381. Insert Delete GetRandom O(1) - Duplicates allowed
 *
 * A multiset of integers supporting insert, remove (one copy) and picking a
 * random element, all in average O(1) time. Each copy is equally likely to
 * be picked, so a value's chance is proportional to how many copies there
 * are.
 *
 * Keeps every copy in an array, for random picks by index, and a map from
 * each value to the set of indices holding it. Removing a copy moves the
 * last element into its slot, updating that element's indices. `random` is
 * the source of randomness, `Math.random` by default.
 *
 * @see https://leetcode.com/problems/insert-delete-getrandom-o1-duplicates-allowed/
 * @difficulty Hard
 * @timeComplexity O(1) on average per operation
 * @spaceComplexity O(n)
 *
 * @example
 * const collection = new InsertDeleteGetrandomO1DuplicatesAllowed();
 * collection.insert(1); // true
 * collection.insert(1); // false: 1 was already present
 * collection.insert(2); // true
 * collection.getRandom(); // 1 two times in three, 2 one time in three
 */
export class InsertDeleteGetrandomO1DuplicatesAllowed {
	readonly #values: number[] = [];
	readonly #indices = new Map<number, Set<number>>();
	readonly #random: () => number;

	constructor(random: () => number = Math.random) {
		this.#random = random;
	}

	/** Adds a copy of `val`; returns whether `val` was absent before. */
	insert(val: number): boolean {
		const indices = this.#indices.get(val) ?? new Set<number>();
		const wasAbsent = indices.size === 0;
		indices.add(this.#values.length);
		this.#indices.set(val, indices);
		this.#values.push(val);
		return wasAbsent;
	}

	/** Removes one copy of `val` if present; returns whether one was removed. */
	remove(val: number): boolean {
		const indices = this.#indices.get(val);
		const index = indices?.values().next().value;
		if (!indices || index === undefined) return false;

		indices.delete(index);
		const lastIndex = this.#values.length - 1;
		const last = this.#values.pop() ?? val;
		if (index !== lastIndex) {
			this.#values[index] = last;
			const lastIndices = this.#indices.get(last);
			lastIndices?.delete(lastIndex);
			lastIndices?.add(index);
		}
		if (indices.size === 0) this.#indices.delete(val);
		return true;
	}

	/** A random element, each copy equally likely. The collection must not be empty. */
	getRandom(): number {
		return this.#values[Math.floor(this.#random() * this.#values.length)] ?? 0;
	}
}
