/**
 * 307. Range Sum Query - Mutable
 *
 * Built from an array, handles updates to single elements and queries for
 * the sum of the elements from index `left` to `right`, inclusive.
 *
 * A Fenwick tree (binary indexed tree): each slot holds the sum of a block
 * of elements whose size is its index's lowest set bit. Any prefix sum
 * combines O(log n) blocks, and an update touches O(log n) blocks.
 *
 * @see https://leetcode.com/problems/range-sum-query-mutable/
 * @difficulty Medium
 * @timeComplexity O(n) to build, O(log n) per update or query
 * @spaceComplexity O(n)
 *
 * @example
 * const sums = new RangeSumQueryMutable([1, 3, 5]);
 * sums.sumRange(0, 2); // 9
 * sums.update(1, 2);
 * sums.sumRange(0, 2); // 8
 */
export class RangeSumQueryMutable {
	readonly #values: number[];
	readonly #tree: number[];

	constructor(nums: readonly number[]) {
		this.#values = [...nums];
		this.#tree = [0, ...nums];
		// Build in O(n) by pushing each block's total up to its parent block.
		for (let i = 1; i < this.#tree.length; i++) {
			const parent = i + (i & -i);
			if (parent < this.#tree.length) {
				this.#tree[parent] = (this.#tree[parent] ?? 0) + (this.#tree[i] ?? 0);
			}
		}
	}

	update(index: number, val: number): void {
		const delta = val - (this.#values[index] ?? 0);
		this.#values[index] = val;
		for (let i = index + 1; i < this.#tree.length; i += i & -i) {
			this.#tree[i] = (this.#tree[i] ?? 0) + delta;
		}
	}

	sumRange(left: number, right: number): number {
		return this.#prefixSum(right + 1) - this.#prefixSum(left);
	}

	/** The sum of the first `count` elements. */
	#prefixSum(count: number): number {
		let sum = 0;
		for (let i = count; i > 0; i -= i & -i) sum += this.#tree[i] ?? 0;
		return sum;
	}
}
