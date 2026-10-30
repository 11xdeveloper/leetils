/**
 * 3000. Maximum Area of Longest Diagonal Rectangle
 *
 * Returns the area of the rectangle with the longest diagonal, choosing
 * the largest area on ties.
 *
 * Compare squared diagonals, which are exact integers.
 *
 * @see https://leetcode.com/problems/maximum-area-of-longest-diagonal-rectangle/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * maximumAreaOfLongestDiagonalRectangle([[9, 3], [8, 6]]); // 48
 */
export const maximumAreaOfLongestDiagonalRectangle = (
	dimensions: readonly (readonly number[])[],
): number => {
	let longest = 0;
	let area = 0;
	for (const [length = 0, width = 0] of dimensions) {
		const diagonal = length * length + width * width;
		if (diagonal > longest || (diagonal === longest && length * width > area)) {
			longest = diagonal;
			area = length * width;
		}
	}
	return area;
};
