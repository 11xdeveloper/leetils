/**
 * 1509. Minimum Difference Between Largest and Smallest Value in Three Moves
 *
 * A move changes one element to any value. Returns the smallest possible
 * difference between the largest and smallest elements after at most three
 * moves.
 *
 * The moves are best spent on the extremes: changing `i` of the smallest
 * and `3 − i` of the largest values to something in between. With the
 * array sorted, try the four splits.
 *
 * @see https://leetcode.com/problems/minimum-difference-between-largest-and-smallest-value-in-three-moves/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumDifferenceBetweenLargestAndSmallestValueInThreeMoves([1, 5, 0, 10, 14]); // 1
 */
export const minimumDifferenceBetweenLargestAndSmallestValueInThreeMoves = (
	nums: readonly number[],
): number => {
	const n = nums.length;
	if (n <= 4) return 0;
	const sorted = nums.toSorted((a, b) => a - b);
	let best = Infinity;
	for (let low = 0; low <= 3; low++) {
		best = Math.min(
			best,
			(sorted[n - 1 - (3 - low)] ?? 0) - (sorted[low] ?? 0),
		);
	}
	return best;
};
