/**
 * 705. Design HashSet
 *
 * A set of integers from 0 to 10^6 with `add`, `remove` and `contains`,
 * built without the built-in hash tables.
 *
 * The keys are small, so a direct-address table works: one byte per
 * possible key, set while the key is present.
 *
 * @see https://leetcode.com/problems/design-hashset/
 * @difficulty Easy
 * @timeComplexity O(1) per operation
 * @spaceComplexity O(10^6)
 *
 * @example
 * const set = new DesignHashset();
 * set.add(1);
 * set.contains(1); // true
 */
export class DesignHashset {
	readonly #present = new Uint8Array(1_000_001);

	add(key: number): void {
		this.#present[key] = 1;
	}

	remove(key: number): void {
		this.#present[key] = 0;
	}

	contains(key: number): boolean {
		return this.#present[key] === 1;
	}
}
