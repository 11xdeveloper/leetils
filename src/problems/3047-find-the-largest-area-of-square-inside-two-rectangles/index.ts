/**
 * 3047. Find the Largest Area of Square Inside Two Rectangles
 *
 * Given rectangles by their bottom-left and top-right corners, the largest
 * area of a square that fits inside the overlap of some two of them.
 *
 * For every pair, the overlap's shorter side is the biggest square's side.
 *
 * @see https://leetcode.com/problems/find-the-largest-area-of-square-inside-two-rectangles/
 * @difficulty Medium
 * @timeComplexity O(n²)
 * @spaceComplexity O(1)
 *
 * @example
 * findTheLargestAreaOfSquareInsideTwoRectangles([[1, 1], [2, 2], [3, 1]], [[3, 3], [4, 4], [6, 6]]); // 1
 */
export const findTheLargestAreaOfSquareInsideTwoRectangles = (
	bottomLeft: readonly (readonly number[])[],
	topRight: readonly (readonly number[])[],
): number => {
	let side = 0;
	for (let i = 0; i < bottomLeft.length; i++)
		for (let j = i + 1; j < bottomLeft.length; j++) {
			const width =
				Math.min(topRight[i]?.[0] ?? 0, topRight[j]?.[0] ?? 0) -
				Math.max(bottomLeft[i]?.[0] ?? 0, bottomLeft[j]?.[0] ?? 0);
			const height =
				Math.min(topRight[i]?.[1] ?? 0, topRight[j]?.[1] ?? 0) -
				Math.max(bottomLeft[i]?.[1] ?? 0, bottomLeft[j]?.[1] ?? 0);
			side = Math.max(side, Math.min(width, height));
		}
	return side * side;
};
