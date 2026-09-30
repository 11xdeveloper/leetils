/**
 * 1151. Minimum Swaps to Group All 1's Together
 *
 * Returns the fewest swaps of two elements of the binary array `data` that
 * gather all its 1s into one contiguous block.
 *
 * The block has one cell per 1, and each swap fills one 0 in it. So slide a
 * window of that size along the array; the answer is the fewest 0s in any
 * window.
 *
 * @see https://leetcode.com/problems/minimum-swaps-to-group-all-1s-together/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * minimumSwapsToGroupAll1sTogether([1, 0, 1, 0, 1]); // 1
 */
export const minimumSwapsToGroupAll1sTogether = (
	data: readonly number[],
): number => {
	const ones = data.reduce((sum, bit) => sum + bit, 0);
	let [inWindow, most] = [0, 0];
	data.forEach((bit, i) => {
		inWindow += bit - (data[i - ones] ?? 0);
		most = Math.max(most, inWindow);
	});
	return ones - most;
};
