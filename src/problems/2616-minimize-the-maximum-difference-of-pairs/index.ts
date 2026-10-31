/**
 * 2616. Minimize the Maximum Difference of Pairs
 *
 * Returns the smallest possible largest difference among `p` pairs of
 * distinct indices.
 *
 * Sort and binary search the answer; for a limit, greedily pair adjacent
 * elements whose gap fits, which forms the most pairs.
 *
 * @see https://leetcode.com/problems/minimize-the-maximum-difference-of-pairs/
 * @difficulty Medium
 * @timeComplexity O(n log n + n log m), where `m` is the largest value
 * @spaceComplexity O(n)
 *
 * @example
 * minimizeTheMaximumDifferenceOfPairs([10, 1, 2, 7, 1, 3], 2); // 1
 */
export const minimizeTheMaximumDifferenceOfPairs = (
	nums: readonly number[],
	p: number,
): number => {
	const sorted = nums.toSorted((a, b) => a - b);
	const pairsWithin = (limit: number): number => {
		let pairs = 0;
		for (let i = 1; i < sorted.length; i++)
			if ((sorted[i] ?? 0) - (sorted[i - 1] ?? 0) <= limit) {
				pairs++;
				i++;
			}
		return pairs;
	};
	let low = 0;
	let high = (sorted.at(-1) ?? 0) - (sorted[0] ?? 0);
	while (low < high) {
		const mid = Math.floor((low + high) / 2);
		if (pairsWithin(mid) >= p) high = mid;
		else low = mid + 1;
	}
	return low;
};
