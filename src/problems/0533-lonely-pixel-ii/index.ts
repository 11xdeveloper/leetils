/**
 * 533. Lonely Pixel II
 *
 * Counts the black pixels (`"B"`) at `(r, c)` where row `r` and column `c`
 * each have exactly `target` black pixels, and every row with a black pixel
 * in column `c` is identical to row `r`.
 *
 * Counts the black pixels per row and column. For each column with
 * `target` of them, the condition holds for all its black pixels or none:
 * it needs the rows with a black pixel there to be identical, with `target`
 * black pixels each. Rows are compared as joined strings.
 *
 * @see https://leetcode.com/problems/lonely-pixel-ii/
 * @difficulty Medium
 * @timeComplexity O(m · n)
 * @spaceComplexity O(m · n) for the joined rows
 *
 * @example
 * lonelyPixelII([["W", "B", "W", "B", "B", "W"], ["W", "B", "W", "B", "B", "W"], ["W", "B", "W", "B", "B", "W"], ["W", "W", "B", "W", "B", "W"]], 3); // 6
 */
export const lonelyPixelII = (
	picture: readonly (readonly string[])[],
	target: number,
): number => {
	const rows = picture.map((row) => row.join(""));
	const rowCounts = picture.map(
		(row) => row.filter((pixel) => pixel === "B").length,
	);
	const cols = picture[0]?.length ?? 0;

	let lonely = 0;
	for (let c = 0; c < cols; c++) {
		const blackRows = picture.flatMap((row, r) => (row[c] === "B" ? [r] : []));
		if (blackRows.length !== target) continue;
		const first = blackRows[0] ?? 0;
		if (
			rowCounts[first] === target &&
			blackRows.every((r) => rows[r] === rows[first])
		)
			lonely += target;
	}
	return lonely;
};
