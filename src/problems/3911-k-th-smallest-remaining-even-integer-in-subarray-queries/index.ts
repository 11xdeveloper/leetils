/**
 * 3911. K-th Smallest Remaining Even Integer in Subarray Queries
 *
 * `nums` strictly increases. For each query `[l, r, k]`, remove the values
 * of `nums[l..r]` from 2, 4, 6, …; returns the k-th smallest even number
 * left.
 *
 * Halve the even values: the answer is twice the k-th positive integer
 * missing from them. With the even values in global order as g₀ < g₁ <
 * …, a query uses a contiguous run of them starting at a, and the t-th
 * of those is skipped past exactly when gₐ₊ₜ - (a + t) ≤ k - a holds,
 * a condition that only gets harder further along, so binary search it.
 *
 * @see https://leetcode.com/problems/k-th-smallest-remaining-even-integer-in-subarray-queries/
 * @difficulty Hard
 * @timeComplexity O((n + q) log n)
 * @spaceComplexity O(n)
 *
 * @example
 * kThSmallestRemainingEvenIntegerInSubarrayQueries([2, 5, 8], [[0, 1, 2], [1, 2, 1], [0, 2, 4]]); // [6, 2, 12]
 */
export const kThSmallestRemainingEvenIntegerInSubarrayQueries = (
	nums: readonly number[],
	queries: readonly (readonly number[])[],
): number[] => {
	// evensBefore[i]: even values among nums[0..i).
	const evensBefore = [0];
	const shifted: number[] = [];
	for (const num of nums) {
		if (num % 2 === 0) shifted.push(num / 2 - shifted.length);
		evensBefore.push(shifted.length);
	}
	return queries.map(([l = 0, r = 0, k = 0]) => {
		const [a, b] = [evensBefore[l] ?? 0, evensBefore[r + 1] ?? 0];
		const limit = k - a;
		let [lo, hi] = [a, b];
		while (lo < hi) {
			const mid = (lo + hi) >>> 1;
			if ((shifted[mid] ?? 0) <= limit) lo = mid + 1;
			else hi = mid;
		}
		return 2 * (k + lo - a);
	});
};
