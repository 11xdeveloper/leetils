/**
 * 4067. Longest Subarray With Restricted Pair Sums
 *
 * The longest subarray with no three different positions where two
 * values add up to the third.
 *
 * Shorter pieces of a valid subarray stay valid, so slide a window. Values
 * are at most 500: an incoming value v breaks the window if two others
 * add up to it, or if some value b and b + v are both already present.
 *
 * @see https://leetcode.com/problems/longest-subarray-with-restricted-pair-sums/
 * @difficulty Medium
 * @timeComplexity O(n · V)
 * @spaceComplexity O(V)
 *
 * @example
 * longestSubarrayWithRestrictedPairSums([2, 3, 5, 3, 2, 1]); // 3
 */
export const longestSubarrayWithRestrictedPairSums = (
	nums: readonly number[],
): number => {
	const limit = Math.max(...nums);
	const counts = new Int32Array(2 * limit + 2);
	const breaks = (v: number): boolean => {
		for (let a = 1; 2 * a <= v; a++) {
			const b = v - a;
			if (
				a === b
					? (counts[a] ?? 0) >= 2
					: (counts[a] ?? 0) > 0 && (counts[b] ?? 0) > 0
			)
				return true;
		}
		for (let b = 1; b + v <= limit; b++)
			if ((counts[b] ?? 0) > 0 && (counts[b + v] ?? 0) > 0) return true;
		return false;
	};
	let [start, best] = [0, 0];
	nums.forEach((v, end) => {
		while (breaks(v)) {
			const gone = nums[start++] ?? 0;
			counts[gone] = (counts[gone] ?? 0) - 1;
		}
		counts[v] = (counts[v] ?? 0) + 1;
		best = Math.max(best, end - start + 1);
	});
	return best;
};
