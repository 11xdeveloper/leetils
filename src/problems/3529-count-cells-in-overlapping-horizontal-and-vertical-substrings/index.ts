/** Marks the cells covered by occurrences of `pattern` in `text`. */
const covered = (text: string, pattern: string): Uint8Array => {
	const m = pattern.length;
	const fail = new Int32Array(m);
	for (let i = 1, length = 0; i < m; i++) {
		while (length > 0 && pattern[i] !== pattern[length])
			length = fail[length - 1] ?? 0;
		if (pattern[i] === pattern[length]) length++;
		fail[i] = length;
	}
	const diff = new Int32Array(text.length + 1);
	for (let i = 0, matched = 0; i < text.length; i++) {
		while (matched > 0 && text[i] !== pattern[matched])
			matched = fail[matched - 1] ?? 0;
		if (text[i] === pattern[matched]) matched++;
		if (matched === m) {
			diff[i - m + 1] = (diff[i - m + 1] ?? 0) + 1;
			diff[i + 1] = (diff[i + 1] ?? 0) - 1;
			matched = fail[matched - 1] ?? 0;
		}
	}
	const marks = new Uint8Array(text.length);
	for (let i = 0, running = 0; i < text.length; i++) {
		running += diff[i] ?? 0;
		marks[i] = running > 0 ? 1 : 0;
	}
	return marks;
};

/**
 * 3529. Count Cells in Overlapping Horizontal and Vertical Substrings
 *
 * Reading the grid row by row (wrapping to the next row) and column by
 * column (wrapping to the next column), count the cells that are part of
 * some horizontal occurrence of `pattern` and some vertical one.
 *
 * Find the occurrences in both readings with KMP, mark the cells each
 * covers with difference arrays, and count the cells marked in both.
 *
 * @see https://leetcode.com/problems/count-cells-in-overlapping-horizontal-and-vertical-substrings/
 * @difficulty Medium
 * @timeComplexity O(m · n + p)
 * @spaceComplexity O(m · n)
 *
 * @example
 * countCellsInOverlappingHorizontalAndVerticalSubstrings([["a", "a", "c", "c"], ["b", "b", "b", "c"], ["a", "a", "b", "a"], ["c", "a", "a", "c"], ["a", "a", "b", "a"]], "abaca"); // 1
 */
export const countCellsInOverlappingHorizontalAndVerticalSubstrings = (
	grid: readonly (readonly string[])[],
	pattern: string,
): number => {
	const m = grid.length;
	const n = grid[0]?.length ?? 0;
	const rows = grid.map((row) => row.join("")).join("");
	let columns = "";
	for (let c = 0; c < n; c++)
		for (let r = 0; r < m; r++) columns += grid[r]?.[c] ?? "";
	const horizontal = covered(rows, pattern);
	const vertical = covered(columns, pattern);
	let count = 0;
	for (let r = 0; r < m; r++)
		for (let c = 0; c < n; c++)
			if (horizontal[r * n + c] && vertical[c * m + r]) count++;
	return count;
};
