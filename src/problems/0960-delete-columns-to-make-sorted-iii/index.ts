/**
 * 960. Delete Columns to Make Sorted III
 *
 * The equal-length strings `strs` form a grid, one per row. Returns the
 * fewest columns to delete so that every row, on its own, is in
 * non-decreasing order.
 *
 * Keeping the most columns is a longest-increasing-subsequence problem over
 * columns, where column `j` can follow column `i` if it's at least as large
 * in every row.
 *
 * @see https://leetcode.com/problems/delete-columns-to-make-sorted-iii/
 * @difficulty Hard
 * @timeComplexity O(n · L^2)
 * @spaceComplexity O(L)
 *
 * @example
 * deleteColumnsToMakeSortedIII(["babca", "bbazb"]); // 3
 */
export const deleteColumnsToMakeSortedIII = (
	strs: readonly string[],
): number => {
	const width = strs[0]?.length ?? 0;
	const longest = new Array<number>(width).fill(1);
	for (let j = 0; j < width; j++) {
		for (let i = 0; i < j; i++) {
			if (strs.every((row) => row.charAt(i) <= row.charAt(j)))
				longest[j] = Math.max(longest[j] ?? 1, (longest[i] ?? 1) + 1);
		}
	}
	return width - Math.max(0, ...longest);
};
