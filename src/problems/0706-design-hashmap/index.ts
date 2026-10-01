/**
 * 706. Design HashMap
 *
 * A map from integers 0 to 10^6 to values 0 to 10^6 with `put`, `get`
 * (returning -1 for a missing key) and `remove`, built without the
 * built-in hash tables.
 *
 * The keys are small, so a direct-address table works: one slot per
 * possible key, holding its value or -1.
 *
 * @see https://leetcode.com/problems/design-hashmap/
 * @difficulty Easy
 * @timeComplexity O(1) per operation
 * @spaceComplexity O(10^6)
 *
 * @example
 * const map = new DesignHashmap();
 * map.put(1, 1);
 * map.get(1); // 1
 */
export class DesignHashmap {
	readonly #values = new Int32Array(1_000_001).fill(-1);

	put(key: number, value: number): void {
		this.#values[key] = value;
	}

	get(key: number): number {
		return this.#values[key] ?? -1;
	}

	remove(key: number): void {
		this.#values[key] = -1;
	}
}
