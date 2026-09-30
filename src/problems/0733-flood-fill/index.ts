/**
 * 733. Flood Fill
 *
 * Returns a copy of `image` where the pixel at `(sr, sc)`, and every pixel
 * of the same colour connected to it up, down, left or right, is recoloured
 * to `color`. The input image is left unchanged.
 *
 * Flood fills from the starting pixel with an explicit stack.
 *
 * @see https://leetcode.com/problems/flood-fill/
 * @difficulty Easy
 * @timeComplexity O(m · n)
 * @spaceComplexity O(m · n)
 *
 * @example
 * floodFill([[1, 1, 1], [1, 1, 0], [1, 0, 1]], 1, 1, 2); // [[2, 2, 2], [2, 2, 0], [2, 0, 1]]
 */
export const floodFill = (
	image: readonly (readonly number[])[],
	sr: number,
	sc: number,
	color: number,
): number[][] => {
	const result = image.map((row) => [...row]);
	const original = result[sr]?.[sc];
	if (original === undefined || original === color) return result;

	const stack: [number, number][] = [[sr, sc]];
	for (let current = stack.pop(); current; current = stack.pop()) {
		const [r, c] = current;
		const row = result[r];
		if (row?.[c] !== original) continue;
		row[c] = color;
		stack.push([r - 1, c], [r + 1, c], [r, c - 1], [r, c + 1]);
	}
	return result;
};
