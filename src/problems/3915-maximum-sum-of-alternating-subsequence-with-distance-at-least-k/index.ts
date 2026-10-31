/**
 * 3915. Maximum Sum of Alternating Subsequence With Distance at Least K
 *
 * Choose indices at least `k` apart whose values strictly alternate up
 * and down (one element counts). Returns the largest sum.
 *
 * Track, for each index, the best sum ending there when the next step
 * must go up, and when it must go down. An index can extend any earlier
 * one at least k back with a smaller (or larger) value: Fenwick trees of
 * prefix and suffix maxima over values, each index added once it's k
 * behind.
 *
 * @see https://leetcode.com/problems/maximum-sum-of-alternating-subsequence-with-distance-at-least-k/
 * @difficulty Hard
 * @timeComplexity O(n log V)
 * @spaceComplexity O(n + V)
 *
 * @example
 * maximumSumOfAlternatingSubsequenceWithDistanceAtLeastK([3, 5, 4, 2, 4], 1); // 14
 */
export const maximumSumOfAlternatingSubsequenceWithDistanceAtLeastK = (
	nums: readonly number[],
	k: number,
): number => {
	const n = nums.length;
	const size = Math.max(...nums) + 1;
	// below: max over smaller values (indexed by value); above: by reversed value.
	const below = new Float64Array(size + 1);
	const above = new Float64Array(size + 1);
	const raise = (tree: Float64Array, i: number, value: number): void => {
		for (; i <= size; i += i & -i) if ((tree[i] ?? 0) < value) tree[i] = value;
	};
	const best = (tree: Float64Array, i: number): number => {
		let result = 0;
		for (; i > 0; i -= i & -i) result = Math.max(result, tree[i] ?? 0);
		return result;
	};
	// risingNext[i]: best ending at i when the next value must be larger; fallingNext: smaller.
	const risingNext = new Float64Array(n);
	const fallingNext = new Float64Array(n);
	let answer = 0;
	for (let i = 0; i < n; i++) {
		if (i >= k) {
			const j = i - k;
			const v = nums[j] ?? 0;
			raise(below, v, risingNext[j] ?? 0);
			raise(above, size - v, fallingNext[j] ?? 0);
		}
		const value = nums[i] ?? 0;
		// Arriving from a smaller value means the step was up, so the next goes down.
		fallingNext[i] = value + best(below, value - 1);
		risingNext[i] = value + best(above, size - value - 1);
		answer = Math.max(answer, fallingNext[i] ?? 0, risingNext[i] ?? 0);
	}
	return answer;
};
