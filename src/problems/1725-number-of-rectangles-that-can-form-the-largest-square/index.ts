/**
 * 1725. Number Of Rectangles That Can Form The Largest Square
 *
 * Each rectangle can be cut into a square as large as its shorter side.
 * Counts the rectangles that give the largest such square.
 *
 * One pass tracking the largest side and how often it occurs.
 *
 * @see https://leetcode.com/problems/number-of-rectangles-that-can-form-the-largest-square/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * numberOfRectanglesThatCanFormTheLargestSquare([[5, 8], [3, 9], [5, 12], [16, 5]]); // 3
 */
export const numberOfRectanglesThatCanFormTheLargestSquare = (
	rectangles: readonly (readonly number[])[],
): number => {
	let [largest, count] = [0, 0];
	for (const [l = 0, w = 0] of rectangles) {
		const side = Math.min(l, w);
		if (side > largest) [largest, count] = [side, 1];
		else if (side === largest) count++;
	}
	return count;
};
