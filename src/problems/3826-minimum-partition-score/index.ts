/**
 * 3826. Minimum Partition Score
 *
 * Split `nums` (positive) into exactly `k` subarrays, each worth
 * s(s + 1)/2 for its sum s. Returns the smallest total.
 *
 * Dynamic programming by parts used. The cost is convex in the sum, so
 * the best split point moves right as the end does; divide and conquer
 * over the ends uses that to fill each layer in O(n log n).
 *
 * @see https://leetcode.com/problems/minimum-partition-score/
 * @difficulty Hard
 * @timeComplexity O(k · n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumPartitionScore([5, 1, 2, 1], 2); // 25
 */
export const minimumPartitionScore = (
	nums: readonly number[],
	k: number,
): number => {
	const n = nums.length;
	const prefix = [0];
	for (const num of nums) prefix.push((prefix.at(-1) ?? 0) + num);
	const value = (from: number, to: number): number => {
		const s = (prefix[to] ?? 0) - (prefix[from] ?? 0);
		return (s * (s + 1)) / 2;
	};
	let previous = Array.from({ length: n + 1 }, (_, i) =>
		i === 0 ? 0 : Number.POSITIVE_INFINITY,
	);
	for (let parts = 1; parts <= k; parts++) {
		const current = new Array<number>(n + 1).fill(Number.POSITIVE_INFINITY);
		const solve = (
			lo: number,
			hi: number,
			optLo: number,
			optHi: number,
		): void => {
			if (lo > hi) return;
			const mid = (lo + hi) >>> 1;
			let [best, bestAt] = [Number.POSITIVE_INFINITY, optLo];
			for (let j = optLo; j <= Math.min(mid - 1, optHi); j++) {
				const candidate =
					(previous[j] ?? Number.POSITIVE_INFINITY) + value(j, mid);
				if (candidate < best) [best, bestAt] = [candidate, j];
			}
			current[mid] = best;
			solve(lo, mid - 1, optLo, bestAt);
			solve(mid + 1, hi, bestAt, optHi);
		};
		solve(parts, n, parts - 1, n - 1);
		previous = current;
	}
	return previous[n] ?? 0;
};
