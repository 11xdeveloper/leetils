/**
 * 531. Lonely Pixel I
 *
 * Counts the black pixels (`"B"`) in `picture` that are the only black pixel
 * in both their row and their column.
 *
 * Counts the black pixels in every row and column, then checks each black
 * pixel against its row's and column's counts.
 *
 * @see https://leetcode.com/problems/lonely-pixel-i/
 * @difficulty Medium
 * @timeComplexity O(m · n)
 * @spaceComplexity O(m + n)
 *
 * @example
 * lonelyPixelI([["W", "W", "B"], ["W", "B", "W"], ["B", "W", "W"]]); // 3
 */
export const lonelyPixelI = (
	picture: readonly (readonly string[])[],
): number => {
	const rowCounts = picture.map(() => 0);
	const colCounts = new Array<number>(picture[0]?.length ?? 0).fill(0);
	for (const [r, row] of picture.entries()) {
		for (const [c, pixel] of row.entries()) {
			if (pixel !== "B") continue;
			rowCounts[r] = (rowCounts[r] ?? 0) + 1;
			colCounts[c] = (colCounts[c] ?? 0) + 1;
		}
	}

	let lonely = 0;
	for (const [r, row] of picture.entries()) {
		for (const [c, pixel] of row.entries()) {
			if (pixel === "B" && rowCounts[r] === 1 && colCounts[c] === 1) lonely++;
		}
	}
	return lonely;
};
