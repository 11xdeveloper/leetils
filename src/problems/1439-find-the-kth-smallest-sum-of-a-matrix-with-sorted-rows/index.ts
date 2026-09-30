/**
 * 1439. Find the Kth Smallest Sum of a Matrix With Sorted Rows
 *
 * Choosing one element from each sorted row of `mat`, returns the `k`th
 * smallest possible sum.
 *
 * Only the `k` smallest sums of the rows so far can lead to the `k`
 * smallest overall, so fold in one row at a time, keeping just those.
 *
 * @see https://leetcode.com/problems/find-the-kth-smallest-sum-of-a-matrix-with-sorted-rows/
 * @difficulty Hard
 * @timeComplexity O(m · k · n log(k · n))
 * @spaceComplexity O(k · n)
 *
 * @example
 * findTheKthSmallestSumOfAMatrixWithSortedRows([[1, 3, 11], [2, 4, 6]], 5); // 7
 */
export const findTheKthSmallestSumOfAMatrixWithSortedRows = (
	mat: readonly (readonly number[])[],
	k: number,
): number => {
	let sums = [0];
	for (const row of mat) {
		sums = sums
			.flatMap((sum) => row.map((value) => sum + value))
			.sort((a, b) => a - b)
			.slice(0, k);
	}
	return sums[k - 1] ?? 0;
};
