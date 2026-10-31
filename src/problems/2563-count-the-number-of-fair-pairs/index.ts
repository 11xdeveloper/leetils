/**
 * 2563. Count the Number of Fair Pairs
 *
 * Returns the number of index pairs whose values sum to between `lower`
 * and `upper` inclusive.
 *
 * Sort, then count pairs summing to at most a bound with two pointers;
 * the answer is the count up to `upper` minus the count below `lower`.
 *
 * @see https://leetcode.com/problems/count-the-number-of-fair-pairs/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * countTheNumberOfFairPairs([0, 1, 7, 4, 4, 5], 3, 6); // 6
 */
export const countTheNumberOfFairPairs = (
	nums: readonly number[],
	lower: number,
	upper: number,
): number => {
	const sorted = nums.toSorted((a, b) => a - b);
	const pairsAtMost = (bound: number): number => {
		let pairs = 0;
		for (let i = 0, j = sorted.length - 1; i < j; i++) {
			while (i < j && (sorted[i] ?? 0) + (sorted[j] ?? 0) > bound) j--;
			pairs += j - i;
		}
		return pairs;
	};
	return pairsAtMost(upper) - pairsAtMost(lower - 1);
};
