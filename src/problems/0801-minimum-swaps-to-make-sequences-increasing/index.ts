/**
 * 801. Minimum Swaps To Make Sequences Increasing
 *
 * A swap exchanges `nums1[i]` and `nums2[i]` at one index. Returns the
 * fewest swaps that make both arrays strictly increasing (it's always
 * possible).
 *
 * DP along the arrays with two states: the fewest swaps so far if index `i`
 * is left alone, and if it's swapped. Each state follows from whichever
 * states at `i - 1` keep both arrays increasing.
 *
 * @see https://leetcode.com/problems/minimum-swaps-to-make-sequences-increasing/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * minimumSwapsToMakeSequencesIncreasing([1, 3, 5, 4], [1, 2, 3, 7]); // 1
 */
export const minimumSwapsToMakeSequencesIncreasing = (
	nums1: readonly number[],
	nums2: readonly number[],
): number => {
	let keep = 0;
	let swap = 1;
	for (let i = 1; i < nums1.length; i++) {
		const [a0, a1, b0, b1] = [
			nums1[i - 1] ?? 0,
			nums1[i] ?? 0,
			nums2[i - 1] ?? 0,
			nums2[i] ?? 0,
		];
		let nextKeep = Number.POSITIVE_INFINITY;
		let nextSwap = Number.POSITIVE_INFINITY;
		if (a0 < a1 && b0 < b1) {
			nextKeep = keep;
			nextSwap = swap + 1;
		}
		if (a0 < b1 && b0 < a1) {
			nextKeep = Math.min(nextKeep, swap);
			nextSwap = Math.min(nextSwap, keep + 1);
		}
		[keep, swap] = [nextKeep, nextSwap];
	}
	return Math.min(keep, swap);
};
