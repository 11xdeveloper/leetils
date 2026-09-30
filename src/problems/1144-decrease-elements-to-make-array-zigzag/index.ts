/**
 * 1144. Decrease Elements To Make Array Zigzag
 *
 * A move decreases an element by 1. Returns the fewest moves to make `nums`
 * zigzag: every even-indexed element larger than its neighbours, or every
 * odd-indexed one.
 *
 * Only the smaller elements ever need decreasing (lowering a peak never
 * helps). So for each choice of which indices are the valleys, lower each
 * valley to one below its smaller neighbour, and take the cheaper choice.
 *
 * @see https://leetcode.com/problems/decrease-elements-to-make-array-zigzag/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * decreaseElementsToMakeArrayZigzag([9, 6, 1, 6, 2]); // 4
 */
export const decreaseElementsToMakeArrayZigzag = (
	nums: readonly number[],
): number => {
	const moves = [0, 0];
	nums.forEach((num, i) => {
		const neighbour = Math.min(
			nums[i - 1] ?? Infinity,
			nums[i + 1] ?? Infinity,
		);
		moves[i % 2] = (moves[i % 2] ?? 0) + Math.max(0, num - neighbour + 1);
	});
	return Math.min(moves[0] ?? 0, moves[1] ?? 0);
};
