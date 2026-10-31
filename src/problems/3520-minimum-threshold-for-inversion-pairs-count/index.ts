/**
 * 3520. Minimum Threshold for Inversion Pairs Count
 *
 * The smallest x such that at least `k` pairs i < j have
 * `nums[j] < nums[i] ≤ nums[j] + x`, or -1.
 *
 * Binary search on x, counting such pairs with a Fenwick tree over the
 * sorted values: for each j, count earlier elements in (nums[j],
 * nums[j] + x].
 *
 * @see https://leetcode.com/problems/minimum-threshold-for-inversion-pairs-count/
 * @difficulty Medium
 * @timeComplexity O(n log n log max)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumThresholdForInversionPairsCount([1, 2, 3, 4, 3, 2, 1], 7); // 2
 */
export const minimumThresholdForInversionPairsCount = (
	nums: readonly number[],
	k: number,
): number => {
	const values = [...new Set(nums)].sort((a, b) => a - b);
	const size = values.length;
	const rankAtMost = (value: number): number => {
		let lo = 0;
		let hi = size;
		while (lo < hi) {
			const mid = (lo + hi) >>> 1;
			if ((values[mid] ?? 0) <= value) lo = mid + 1;
			else hi = mid;
		}
		return lo;
	};
	const pairs = (x: number): number => {
		const tree = new Int32Array(size + 1);
		let count = 0;
		for (const num of nums) {
			const prefix = (r: number): number => {
				let sum = 0;
				for (let i = r; i > 0; i -= i & -i) sum += tree[i] ?? 0;
				return sum;
			};
			count += prefix(rankAtMost(num + x)) - prefix(rankAtMost(num));
			for (let i = rankAtMost(num); i <= size; i += i & -i)
				tree[i] = (tree[i] ?? 0) + 1;
		}
		return count;
	};
	const span = (values.at(-1) ?? 0) - (values[0] ?? 0);
	if (pairs(span) < k) return -1;
	let lo = 0;
	let hi = span;
	while (lo < hi) {
		const mid = Math.floor((lo + hi) / 2);
		if (pairs(mid) >= k) hi = mid;
		else lo = mid + 1;
	}
	return lo;
};
