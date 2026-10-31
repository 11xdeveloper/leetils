/**
 * 4051. Count Subarrays with Distant Sums
 *
 * Counts the subarrays whose sum is at least `k` away from `goal`.
 *
 * With prefix sums, count pairs whose difference is at least goal + k or
 * at most goal - k (for k = 0 every subarray counts), using a Fenwick tree
 * over the sorted prefix values.
 *
 * @see https://leetcode.com/problems/count-subarrays-with-distant-sums/
 * @difficulty Hard
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * countSubarraysWithDistantSums([1, 2, 1], 4, 1); // 5
 */
export const countSubarraysWithDistantSums = (
	nums: readonly number[],
	goal: number,
	k: number,
): number => {
	const n = nums.length;
	if (k === 0) return (n * (n + 1)) / 2;
	const prefix = [0];
	for (const x of nums) prefix.push((prefix.at(-1) ?? 0) + x);
	const values = [...new Set(prefix)].sort((a, b) => a - b);
	const m = values.length;
	/** How many sorted values are at most x. */
	const atMost = (x: number): number => {
		let [lo, hi] = [0, m];
		while (lo < hi) {
			const mid = (lo + hi) >>> 1;
			if ((values[mid] ?? 0) <= x) lo = mid + 1;
			else hi = mid;
		}
		return lo;
	};
	const tree = new Int32Array(m + 1);
	const count = (r: number): number => {
		let total = 0;
		for (let i = r; i > 0; i -= i & -i) total += tree[i] ?? 0;
		return total;
	};
	let [result, seen] = [0, 0];
	for (const p of prefix) {
		// Earlier q with p - q ≥ goal + k, i.e. q ≤ p - goal - k; or p - q ≤ goal - k, i.e. q ≥ p - goal + k.
		result += count(atMost(p - goal - k));
		result += seen - count(atMost(p - goal + k - 1));
		for (let i = atMost(p); i <= m; i += i & -i) tree[i] = (tree[i] ?? 0) + 1;
		seen++;
	}
	return result;
};
