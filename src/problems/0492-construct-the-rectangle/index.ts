/**
 * 492. Construct the Rectangle
 *
 * Returns the dimensions `[length, width]` of a rectangle with the given
 * `area`, where `length ≥ width` and the two are as close as possible.
 *
 * The closest pair has the largest width up to `√area`, so it tries widths
 * down from there until one divides the area.
 *
 * @see https://leetcode.com/problems/construct-the-rectangle/
 * @difficulty Easy
 * @timeComplexity O(√area)
 * @spaceComplexity O(1)
 *
 * @example
 * constructTheRectangle(37); // [37, 1]
 */
export const constructTheRectangle = (area: number): number[] => {
	let width = Math.floor(Math.sqrt(area));
	while (area % width !== 0) width--;
	return [area / width, width];
};
