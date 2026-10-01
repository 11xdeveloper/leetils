/**
 * 1865. Finding Pairs With a Certain Sum
 *
 * Supports adding to an element of `nums2`, and counting pairs `(i, j)`
 * with `nums1[i] + nums2[j] = tot`.
 *
 * `nums1` is small (at most 1000), so count `nums2` values in a map kept
 * up to date by `add`, and look up each `nums1` value's complement.
 *
 * @see https://leetcode.com/problems/finding-pairs-with-a-certain-sum/
 * @difficulty Medium
 * @timeComplexity O(1) per add, O(|nums1|) per count
 * @spaceComplexity O(|nums2|)
 *
 * @example
 * const pairs = new FindingPairsWithACertainSum([1, 1, 2, 2, 2, 3], [1, 4, 5, 2, 5, 4]);
 * pairs.count(7); // 8
 */
export class FindingPairsWithACertainSum {
	readonly #nums1: readonly number[];
	readonly #nums2: number[];
	readonly #counts = new Map<number, number>();

	constructor(nums1: readonly number[], nums2: readonly number[]) {
		this.#nums1 = nums1;
		this.#nums2 = [...nums2];
		for (const num of nums2)
			this.#counts.set(num, (this.#counts.get(num) ?? 0) + 1);
	}

	add(index: number, val: number): void {
		const old = this.#nums2[index] ?? 0;
		this.#counts.set(old, (this.#counts.get(old) ?? 0) - 1);
		this.#nums2[index] = old + val;
		this.#counts.set(old + val, (this.#counts.get(old + val) ?? 0) + 1);
	}

	count(tot: number): number {
		let pairs = 0;
		for (const num of this.#nums1) pairs += this.#counts.get(tot - num) ?? 0;
		return pairs;
	}
}
