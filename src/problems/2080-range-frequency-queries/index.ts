/**
 * 2080. Range Frequency Queries
 *
 * Answers queries for how often a value occurs in a subarray.
 *
 * Store each value's sorted indices; a query is two binary searches.
 *
 * @see https://leetcode.com/problems/range-frequency-queries/
 * @difficulty Medium
 * @timeComplexity O(n) to build, O(log n) per query
 * @spaceComplexity O(n)
 *
 * @example
 * const queries = new RangeFrequencyQueries([12, 33, 4, 56, 22, 2, 34, 33, 22, 12, 34, 56]);
 * queries.query(1, 2, 4); // 1
 * queries.query(0, 11, 33); // 2
 */
export class RangeFrequencyQueries {
	readonly #indices = new Map<number, number[]>();

	constructor(arr: readonly number[]) {
		for (const [i, value] of arr.entries()) {
			const indices = this.#indices.get(value);
			if (indices) indices.push(i);
			else this.#indices.set(value, [i]);
		}
	}

	query(left: number, right: number, value: number): number {
		const indices = this.#indices.get(value) ?? [];
		/** The number of indices below `bound`. */
		const below = (bound: number): number => {
			let [lo, hi] = [0, indices.length];
			while (lo < hi) {
				const mid = (lo + hi) >> 1;
				if ((indices[mid] ?? 0) < bound) lo = mid + 1;
				else hi = mid;
			}
			return lo;
		};
		return below(right + 1) - below(left);
	}
}
