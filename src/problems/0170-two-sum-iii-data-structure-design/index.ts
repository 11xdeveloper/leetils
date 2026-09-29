/**
 * 170. Two Sum III - Data structure design
 *
 * Accepts a stream of integers and answers whether any two of them (at
 * different positions in the stream) add up to a given value.
 *
 * Counts how often each number was added, so `add` is constant time. `find`
 * checks each distinct number for its complement; a number can pair with
 * itself only if it was added at least twice.
 *
 * @see https://leetcode.com/problems/two-sum-iii-data-structure-design/
 * @difficulty Easy
 * @timeComplexity O(1) for add, O(n) for find, where n is the number of distinct numbers
 * @spaceComplexity O(n)
 *
 * @example
 * const twoSum = new TwoSumIIIDataStructureDesign();
 * twoSum.add(1);
 * twoSum.add(3);
 * twoSum.add(5);
 * twoSum.find(4); // true
 * twoSum.find(7); // false
 */
export class TwoSumIIIDataStructureDesign {
	readonly #counts = new Map<number, number>();

	add(number: number): void {
		this.#counts.set(number, (this.#counts.get(number) ?? 0) + 1);
	}

	/** Whether any two added numbers sum to `value`. */
	find(value: number): boolean {
		for (const [number, count] of this.#counts) {
			const complement = value - number;
			if (complement === number ? count > 1 : this.#counts.has(complement))
				return true;
		}
		return false;
	}
}
