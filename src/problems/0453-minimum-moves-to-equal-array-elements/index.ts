/**
 * 453. Minimum Moves to Equal Array Elements
 *
 * A move adds 1 to all but one element. Returns the fewest moves that make
 * every element equal.
 *
 * Adding 1 to all but one element changes the differences between elements
 * just as subtracting 1 from that one would. So the answer is the number of
 * single decrements needed to bring everything down to the minimum.
 *
 * @see https://leetcode.com/problems/minimum-moves-to-equal-array-elements/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * minimumMovesToEqualArrayElements([1, 2, 3]); // 3
 */
export const minimumMovesToEqualArrayElements = (
	nums: readonly number[],
): number => {
	const min = Math.min(...nums);
	let moves = 0;
	for (const num of nums) moves += num - min;
	return moves;
};
