/**
 * 2671. Frequency Tracker
 *
 * A multiset of numbers. `add` inserts one, `deleteOne` removes one copy
 * if present, and `hasFrequency` says whether some number appears exactly
 * the given number of times.
 *
 * Keep each number's count and how many numbers have each count.
 *
 * @see https://leetcode.com/problems/frequency-tracker/
 * @difficulty Medium
 * @timeComplexity O(1) per operation
 * @spaceComplexity O(n)
 *
 * @example
 * const tracker = new FrequencyTracker();
 * tracker.add(3);
 * tracker.hasFrequency(1); // true
 */
export class FrequencyTracker {
	readonly #count = new Map<number, number>();
	readonly #withCount = new Map<number, number>();

	add(number: number): void {
		this.#shift(number, 1);
	}

	deleteOne(number: number): void {
		if ((this.#count.get(number) ?? 0) > 0) this.#shift(number, -1);
	}

	hasFrequency(frequency: number): boolean {
		return (this.#withCount.get(frequency) ?? 0) > 0;
	}

	#shift(number: number, change: number): void {
		const before = this.#count.get(number) ?? 0;
		const after = before + change;
		this.#count.set(number, after);
		this.#withCount.set(before, (this.#withCount.get(before) ?? 0) - 1);
		this.#withCount.set(after, (this.#withCount.get(after) ?? 0) + 1);
	}
}
