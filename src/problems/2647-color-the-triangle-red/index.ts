/**
 * 2647. Color the Triangle Red
 *
 * An equilateral triangle of side `n` is split into unit triangles; row
 * `i` holds triangles `(i, 1)` to `(i, 2i - 1)`. Any triangle with at
 * least two red neighbours turns red. Returns a smallest set of
 * triangles to colour first so that everything ends up red.
 *
 * Colour the top triangle, then work up from the bottom row in a cycle
 * of four patterns: every upward triangle; the second triangle only; the
 * upward triangles from the third on; the first triangle only. Each step
 * lets the spread fill the rows below it.
 *
 * @see https://leetcode.com/problems/color-the-triangle-red/
 * @difficulty Hard
 * @timeComplexity O(n²)
 * @spaceComplexity O(n²)
 *
 * @example
 * colorTheTriangleRed(2); // [[1, 1], [2, 1], [2, 3]]
 */
export const colorTheTriangleRed = (n: number): number[][] => {
	const red = [[1, 1]];
	for (let row = n, pattern = 0; row > 1; row--, pattern = (pattern + 1) % 4) {
		if (pattern === 0) for (let j = 1; j < 2 * row; j += 2) red.push([row, j]);
		else if (pattern === 1) red.push([row, 2]);
		else if (pattern === 2)
			for (let j = 3; j < 2 * row; j += 2) red.push([row, j]);
		else red.push([row, 1]);
	}
	return red;
};
