/**
 * 1855. Maximum Distance Between a Pair of Values
 *
 * Both arrays are non-increasing. Returns the largest `j − i` with
 * `i ≤ j` and `nums1[i] ≤ nums2[j]`, or 0.
 *
 * Two pointers: advance `j` while the pair is valid, otherwise advance
 * `i`.
 *
 * @see https://leetcode.com/problems/maximum-distance-between-a-pair-of-values/
 * @difficulty Medium
 * @timeComplexity O(m + n)
 * @spaceComplexity O(1)
 *
 * @example
 * maximumDistanceBetweenAPairOfValues([55, 30, 5, 4, 2], [100, 20, 10, 10, 5]); // 2
 */
export const maximumDistanceBetweenAPairOfValues = (
	nums1: readonly number[],
	nums2: readonly number[],
): number => {
	let [i, best] = [0, 0];
	for (let j = 0; j < nums2.length; j++) {
		while (i < nums1.length && (nums1[i] ?? 0) > (nums2[j] ?? 0)) i++;
		if (i === nums1.length) break;
		best = Math.max(best, j - i);
	}
	return best;
};
