/**
 * 1537. Get the Maximum Score
 *
 * Walks left to right through either of two sorted arrays of distinct
 * values, switching arrays at any shared value. Returns the largest sum of
 * the values visited, modulo 10^9 + 7 (maximised before reducing).
 *
 * The shared values split both arrays into matching segments; between two
 * shared values take the larger of the two segments' sums. Two pointers
 * walk both arrays together.
 *
 * @see https://leetcode.com/problems/get-the-maximum-score/
 * @difficulty Hard
 * @timeComplexity O(m + n)
 * @spaceComplexity O(1)
 *
 * @example
 * getTheMaximumScore([2, 4, 5, 8, 10], [4, 6, 8, 9]); // 30
 */
export const getTheMaximumScore = (
	nums1: readonly number[],
	nums2: readonly number[],
): number => {
	let [i, j, sum1, sum2] = [0, 0, 0, 0];
	while (i < nums1.length || j < nums2.length) {
		const [a = Infinity, b = Infinity] = [nums1[i], nums2[j]];
		if (a < b) {
			sum1 += a;
			i++;
		} else if (b < a) {
			sum2 += b;
			j++;
		} else {
			const best = Math.max(sum1, sum2) + a;
			[sum1, sum2, i, j] = [best, best, i + 1, j + 1];
		}
	}
	return Math.max(sum1, sum2) % 1_000_000_007;
};
