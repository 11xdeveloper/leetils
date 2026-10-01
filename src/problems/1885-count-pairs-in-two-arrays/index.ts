/**
 * 1885. Count Pairs in Two Arrays
 *
 * Counts the pairs `i < j` with `nums1[i] + nums1[j] > nums2[i] + nums2[j]`.
 *
 * With `d = nums1 − nums2`, count pairs with `d[i] + d[j] > 0`: sort and
 * use two pointers.
 *
 * @see https://leetcode.com/problems/count-pairs-in-two-arrays/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * countPairsInTwoArrays([1, 10, 6, 2], [1, 4, 1, 5]); // 5
 */
export const countPairsInTwoArrays = (
	nums1: readonly number[],
	nums2: readonly number[],
): number => {
	const diff = nums1
		.map((value, i) => value - (nums2[i] ?? 0))
		.sort((a, b) => a - b);
	let [low, high, pairs] = [0, diff.length - 1, 0];
	while (low < high) {
		if ((diff[low] ?? 0) + (diff[high] ?? 0) > 0) {
			pairs += high - low;
			high--;
		} else {
			low++;
		}
	}
	return pairs;
};
