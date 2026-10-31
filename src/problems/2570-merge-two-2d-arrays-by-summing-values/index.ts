/**
 * 2570. Merge Two 2D Arrays by Summing Values
 *
 * Each array lists `[id, value]` pairs sorted by unique id. Returns the
 * merged list, sorted by id, with the values of ids in both summed.
 *
 * Merge the two sorted lists with two pointers.
 *
 * @see https://leetcode.com/problems/merge-two-2d-arrays-by-summing-values/
 * @difficulty Easy
 * @timeComplexity O(m + n)
 * @spaceComplexity O(m + n)
 *
 * @example
 * mergeTwo2dArraysBySummingValues([[1, 2], [2, 3], [4, 5]], [[1, 4], [3, 2], [4, 1]]); // [[1, 6], [2, 3], [3, 2], [4, 6]]
 */
export const mergeTwo2dArraysBySummingValues = (
	nums1: readonly (readonly number[])[],
	nums2: readonly (readonly number[])[],
): number[][] => {
	const merged: number[][] = [];
	let i = 0;
	let j = 0;
	while (i < nums1.length || j < nums2.length) {
		const [id1 = Number.POSITIVE_INFINITY, value1 = 0] = nums1[i] ?? [];
		const [id2 = Number.POSITIVE_INFINITY, value2 = 0] = nums2[j] ?? [];
		if (id1 === id2) {
			merged.push([id1, value1 + value2]);
			i++;
			j++;
		} else if (id1 < id2) {
			merged.push([id1, value1]);
			i++;
		} else {
			merged.push([id2, value2]);
			j++;
		}
	}
	return merged;
};
