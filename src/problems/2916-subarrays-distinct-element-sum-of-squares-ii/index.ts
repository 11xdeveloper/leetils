const MOD = 1_000_000_007;

/**
 * 2916. Subarrays Distinct Element Sum of Squares II
 *
 * Returns the sum, over every subarray, of the square of its number of
 * distinct values, modulo 1e9 + 7, for arrays too long to try each one.
 *
 * Sweep the right end. Adding `nums[r]` raises the distinct count by 1
 * for every start after its previous occurrence, which raises the sum of
 * squares by twice those starts' counts plus their number. A segment
 * tree with range add and range sum tracks the counts.
 *
 * @see https://leetcode.com/problems/subarrays-distinct-element-sum-of-squares-ii/
 * @difficulty Hard
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * subarraysDistinctElementSumOfSquaresII([1, 2, 1]); // 15
 */
export const subarraysDistinctElementSumOfSquaresII = (
	nums: readonly number[],
): number => {
	const n = nums.length;
	const sums = new Float64Array(4 * n);
	const pending = new Float64Array(4 * n);
	const apply = (
		node: number,
		low: number,
		high: number,
		add: number,
	): void => {
		sums[node] = (sums[node] ?? 0) + add * (high - low + 1);
		pending[node] = (pending[node] ?? 0) + add;
	};
	const push = (node: number, low: number, mid: number, high: number): void => {
		const add = pending[node] ?? 0;
		if (add === 0) return;
		apply(2 * node, low, mid, add);
		apply(2 * node + 1, mid + 1, high, add);
		pending[node] = 0;
	};
	/** Adds 1 to every count in [from, to] and returns their sum beforehand. */
	const bump = (
		node: number,
		low: number,
		high: number,
		from: number,
		to: number,
	): number => {
		if (to < low || high < from) return 0;
		if (from <= low && high <= to) {
			const before = sums[node] ?? 0;
			apply(node, low, high, 1);
			return before;
		}
		const mid = (low + high) >> 1;
		push(node, low, mid, high);
		const before =
			bump(2 * node, low, mid, from, to) +
			bump(2 * node + 1, mid + 1, high, from, to);
		sums[node] = (sums[2 * node] ?? 0) + (sums[2 * node + 1] ?? 0);
		return before;
	};

	const lastSeen = new Map<number, number>();
	let squares = 0;
	let total = 0;
	for (const [r, num] of nums.entries()) {
		const from = (lastSeen.get(num) ?? -1) + 1;
		lastSeen.set(num, r);
		const before = bump(1, 0, n - 1, from, r) % MOD;
		squares = (squares + 2 * before + (r - from + 1)) % MOD;
		total = (total + squares) % MOD;
	}
	return total;
};
