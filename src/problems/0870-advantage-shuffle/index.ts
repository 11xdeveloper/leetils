/**
 * 870. Advantage Shuffle
 *
 * Returns a rearrangement of `nums1` that maximises how many indices have
 * `nums1[i] > nums2[i]`.
 *
 * Greedy, like a card game: the entries of `nums2` are handled from largest
 * to smallest. Each gets the largest remaining number of `nums1` if that
 * beats it; otherwise it's unbeatable, and gets the smallest number, which
 * is least useful elsewhere.
 *
 * @see https://leetcode.com/problems/advantage-shuffle/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * advantageShuffle([2, 7, 11, 15], [1, 10, 4, 11]); // [2, 11, 7, 15]
 */
export const advantageShuffle = (
	nums1: readonly number[],
	nums2: readonly number[],
): number[] => {
	const sorted = nums1.toSorted((a, b) => a - b);
	const order = nums2
		.map((_, i) => i)
		.sort((a, b) => (nums2[b] ?? 0) - (nums2[a] ?? 0));
	const result = new Array<number>(nums1.length);
	let low = 0;
	let high = sorted.length - 1;
	for (const i of order) {
		if ((sorted[high] ?? 0) > (nums2[i] ?? 0)) result[i] = sorted[high--] ?? 0;
		else result[i] = sorted[low++] ?? 0;
	}
	return result;
};
