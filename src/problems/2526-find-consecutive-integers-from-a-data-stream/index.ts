/**
 * 2526. Find Consecutive Integers from a Data Stream
 *
 * A stream of integers, built with a `value` and a `k`. `consec` adds an
 * integer and returns whether the last `k` integers all equal `value`.
 *
 * Count how many integers in a row have equalled `value`.
 *
 * @see https://leetcode.com/problems/find-consecutive-integers-from-a-data-stream/
 * @difficulty Medium
 * @timeComplexity O(1) per operation
 * @spaceComplexity O(1)
 *
 * @example
 * const stream = new FindConsecutiveIntegersFromADataStream(4, 1);
 * stream.consec(4); // true
 */
export class FindConsecutiveIntegersFromADataStream {
	readonly #value: number;
	readonly #k: number;
	#run = 0;

	constructor(value: number, k: number) {
		this.#value = value;
		this.#k = k;
	}

	consec(num: number): boolean {
		this.#run = num === this.#value ? this.#run + 1 : 0;
		return this.#run >= this.#k;
	}
}
