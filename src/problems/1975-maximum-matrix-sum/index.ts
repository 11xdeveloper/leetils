/**
 * 1975. Maximum Matrix Sum
 *
 * Any number of times, negates two adjacent elements of `matrix`. Returns
 * the largest possible sum.
 *
 * Negative signs can be moved anywhere and cancelled in pairs, so all can
 * be removed unless their count is odd; then one remains, best on the
 * element with the smallest absolute value.
 *
 * @see https://leetcode.com/problems/maximum-matrix-sum/
 * @difficulty Medium
 * @timeComplexity O(n^2)
 * @spaceComplexity O(1)
 *
 * @example
 * maximumMatrixSum([[1, 2, 3], [-1, -2, -3], [1, 2, 3]]); // 16
 */
export const maximumMatrixSum = (
	matrix: readonly (readonly number[])[],
): number => {
	let [total, negatives, smallest] = [0, 0, Infinity];
	for (const row of matrix) {
		for (const value of row) {
			total += Math.abs(value);
			if (value < 0) negatives++;
			smallest = Math.min(smallest, Math.abs(value));
		}
	}
	return negatives % 2 === 0 ? total : total - 2 * smallest;
};
