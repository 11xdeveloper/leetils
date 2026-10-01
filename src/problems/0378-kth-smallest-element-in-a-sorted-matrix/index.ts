/**
 * 378. Kth Smallest Element in a Sorted Matrix
 *
 * Returns the `k`th smallest value (counting repeats) in an n×n matrix whose
 * rows and columns are each sorted in ascending order, without sorting all
 * the values.
 *
 * Binary search over values: for a candidate value, walking a staircase
 * from the bottom-left corner counts how many cells are at most it in
 * O(n). The smallest value with at least `k` cells at or below it is the
 * answer, and it's always a value in the matrix.
 *
 * @see https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/
 * @difficulty Medium
 * @timeComplexity O(n log(max - min))
 * @spaceComplexity O(1)
 *
 * @example
 * kthSmallestElementInASortedMatrix([[1, 5, 9], [10, 11, 13], [12, 13, 15]], 8); // 13
 */
export const kthSmallestElementInASortedMatrix = (
	matrix: readonly (readonly number[])[],
	k: number,
): number => {
	const n = matrix.length;
	const countAtMost = (value: number): number => {
		let count = 0;
		for (let r = n - 1, c = 0; r >= 0 && c < n; ) {
			if ((matrix[r]?.[c] ?? 0) <= value) {
				count += r + 1;
				c++;
			} else {
				r--;
			}
		}
		return count;
	};

	let low = matrix[0]?.[0] ?? 0;
	let high = matrix[n - 1]?.[n - 1] ?? 0;
	while (low < high) {
		const mid = Math.floor((low + high) / 2);
		if (countAtMost(mid) >= k) high = mid;
		else low = mid + 1;
	}

	return low;
};
