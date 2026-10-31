/**
 * 3728. Stable Subarrays With Equal Boundary and Interior Sum
 *
 * Counts subarrays of length at least 3 whose first and last elements
 * both equal the sum of the elements between them.
 *
 * With prefix sums P, `[l..r]` qualifies when `capacity[l]` = `capacity[r]` =
 * P[r] - P[l + 1]. Sweep r, keeping counts of (`capacity[l]`, P[l + 1]) for
 * every l at least two behind.
 *
 * @see https://leetcode.com/problems/stable-subarrays-with-equal-boundary-and-interior-sum/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * stableSubarraysWithEqualBoundaryAndInteriorSum([9, 3, 3, 3, 9]); // 2
 */
export const stableSubarraysWithEqualBoundaryAndInteriorSum = (
	capacity: readonly number[],
): number => {
	const prefix = [0];
	for (const num of capacity) prefix.push((prefix.at(-1) ?? 0) + num);
	const seen = new Map<string, number>();
	let count = 0;
	for (let r = 2; r < capacity.length; r++) {
		const l = r - 2;
		const key = `${capacity[l]},${prefix[l + 1]}`;
		seen.set(key, (seen.get(key) ?? 0) + 1);
		count +=
			seen.get(`${capacity[r]},${(prefix[r] ?? 0) - (capacity[r] ?? 0)}`) ?? 0;
	}
	return count;
};
