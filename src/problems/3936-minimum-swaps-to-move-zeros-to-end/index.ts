/**
 * 3936. Minimum Swaps to Move Zeros to End
 *
 * The fewest swaps moving every 0 to the end: each 0 among the first k
 * positions, for k non-zero elements, needs one swap.
 *
 * @see https://leetcode.com/problems/minimum-swaps-to-move-zeros-to-end/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * minimumSwapsToMoveZerosToEnd([0, 1, 0, 3, 12]); // 2
 */
export const minimumSwapsToMoveZerosToEnd = (
	nums: readonly number[],
): number => {
	const kept = nums.filter((num) => num !== 0).length;
	return nums.slice(0, kept).filter((num) => num === 0).length;
};
