/**
 * 3200. Maximum Height of a Triangle
 *
 * Build a triangle of balls with rows of 1, 2, 3, … balls, each row a single
 * color and neighbouring rows different colors. Returns the most rows
 * possible with `red` red and `blue` blue balls.
 *
 * Try starting with each color and add rows while the balls last.
 *
 * @see https://leetcode.com/problems/maximum-height-of-a-triangle/
 * @difficulty Easy
 * @timeComplexity O(√(red + blue))
 * @spaceComplexity O(1)
 *
 * @example
 * maximumHeightOfATriangle(2, 4); // 3
 */
export const maximumHeightOfATriangle = (red: number, blue: number): number => {
	const height = (first: number, second: number): number => {
		const left = [first, second];
		let rows = 0;
		while ((left[rows % 2] ?? 0) >= rows + 1) {
			left[rows % 2] = (left[rows % 2] ?? 0) - (rows + 1);
			rows++;
		}
		return rows;
	};
	return Math.max(height(red, blue), height(blue, red));
};
