/**
 * 3073. Maximum Increasing Triplet Value
 *
 * The largest `nums[i] - nums[j] + nums[k]` over indices `i < j < k` with
 * `nums[i] < nums[j] < nums[k]`. Such a triplet is guaranteed to exist.
 *
 * For each middle `j`, the best `k` is the largest later element, and the
 * best `i` is the largest earlier element below `nums[j]`. Find the latter
 * with a Fenwick tree of prefix maxima over the values' ranks, filled in as
 * the scan moves right.
 *
 * @see https://leetcode.com/problems/maximum-increasing-triplet-value/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * maximumIncreasingTripletValue([5, 6, 9]); // 8
 */
export const maximumIncreasingTripletValue = (
	nums: readonly number[],
): number => {
	const n = nums.length;
	const values = [...new Set(nums)].sort((a, b) => a - b);
	const rank = new Map(values.map((value, i) => [value, i + 1]));
	const size = values.length;
	const tree = new Float64Array(size + 1).fill(Number.NEGATIVE_INFINITY);
	const laterMax = new Float64Array(n + 1).fill(Number.NEGATIVE_INFINITY);
	for (let i = n - 1; i >= 0; i--)
		laterMax[i] = Math.max(laterMax[i + 1] ?? 0, nums[i] ?? 0);
	let best = Number.NEGATIVE_INFINITY;
	for (let j = 0; j < n; j++) {
		const middle = nums[j] ?? 0;
		const r = rank.get(middle) ?? 0;
		let below = Number.NEGATIVE_INFINITY;
		for (let i = r - 1; i > 0; i -= i & -i)
			below = Math.max(below, tree[i] ?? 0);
		const after = laterMax[j + 1] ?? 0;
		if (below > Number.NEGATIVE_INFINITY && after > middle)
			best = Math.max(best, below - middle + after);
		for (let i = r; i <= size; i += i & -i)
			tree[i] = Math.max(tree[i] ?? 0, middle);
	}
	return best;
};
