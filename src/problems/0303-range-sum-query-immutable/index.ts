/**
 * 303. Range Sum Query - Immutable
 *
 * Built from an array that never changes, answers many queries for the sum
 * of the elements from index `left` to `right`, inclusive.
 *
 * Stores prefix sums: `prefix[i]` is the sum of the first `i` elements, so a
 * range's sum is the difference of two prefix sums.
 *
 * @see https://leetcode.com/problems/range-sum-query-immutable/
 * @difficulty Easy
 * @timeComplexity O(n) to build, O(1) per query
 * @spaceComplexity O(n)
 *
 * @example
 * const sums = new RangeSumQueryImmutable([-2, 0, 3, -5, 2, -1]);
 * sums.sumRange(0, 2); // 1
 * sums.sumRange(2, 5); // -1
 */
export class RangeSumQueryImmutable {
	readonly #prefix: number[] = [0];

	constructor(nums: readonly number[]) {
		for (const num of nums) this.#prefix.push((this.#prefix.at(-1) ?? 0) + num);
	}

	sumRange(left: number, right: number): number {
		return (this.#prefix[right + 1] ?? 0) - (this.#prefix[left] ?? 0);
	}
}
