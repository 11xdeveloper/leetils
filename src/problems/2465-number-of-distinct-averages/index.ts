/**
 * 2465. Number of Distinct Averages
 *
 * Repeatedly removes the smallest and largest numbers, recording their
 * average. Returns how many distinct averages are recorded.
 *
 * Sort and pair the ends; sums stand in for averages.
 *
 * @see https://leetcode.com/problems/number-of-distinct-averages/
 * @difficulty Easy
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * numberOfDistinctAverages([4, 1, 4, 0, 3, 5]); // 2
 */
export const numberOfDistinctAverages = (nums: readonly number[]): number => {
	const sorted = nums.toSorted((a, b) => a - b);
	const sums = new Set<number>();
	for (let [i, j] = [0, sorted.length - 1]; i < j; i++, j--)
		sums.add((sorted[i] ?? 0) + (sorted[j] ?? 0));
	return sums.size;
};
