/**
 * 3312. Sorted GCD Pair Queries
 *
 * Sort the GCDs of all pairs of elements of `nums`. Returns the GCD at each
 * queried position.
 *
 * Count pairs whose GCD is exactly g, from the largest g down: pairs of
 * multiples of g, minus those whose GCD is a bigger multiple. Prefix sums
 * over g then turn each query into a binary search.
 *
 * @see https://leetcode.com/problems/sorted-gcd-pair-queries/
 * @difficulty Hard
 * @timeComplexity O(V log V + q log V), for values up to V
 * @spaceComplexity O(V)
 *
 * @example
 * sortedGcdPairQueries([2, 3, 4], [0, 2, 2]); // [1, 2, 2]
 */
export const sortedGcdPairQueries = (
	nums: readonly number[],
	queries: readonly number[],
): number[] => {
	const max = Math.max(...nums);
	const counts = new Float64Array(max + 1);
	for (const num of nums) counts[num] = (counts[num] ?? 0) + 1;
	const exact = new Float64Array(max + 1);
	for (let g = max; g >= 1; g--) {
		let multiples = 0;
		for (let v = g; v <= max; v += g) multiples += counts[v] ?? 0;
		let pairs = (multiples * (multiples - 1)) / 2;
		for (let v = 2 * g; v <= max; v += g) pairs -= exact[v] ?? 0;
		exact[g] = pairs;
	}
	const prefix = new Float64Array(max + 1);
	for (let g = 1; g <= max; g++)
		prefix[g] = (prefix[g - 1] ?? 0) + (exact[g] ?? 0);
	return queries.map((query) => {
		let lo = 1;
		let hi = max;
		while (lo < hi) {
			const mid = (lo + hi) >>> 1;
			if ((prefix[mid] ?? 0) > query) hi = mid;
			else lo = mid + 1;
		}
		return lo;
	});
};
