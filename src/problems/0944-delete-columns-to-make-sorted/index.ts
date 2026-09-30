/**
 * 944. Delete Columns to Make Sorted
 *
 * The equal-length strings `strs` form a grid, one per row. Returns how
 * many columns aren't sorted top to bottom.
 *
 * Checks each column for a letter smaller than the one above it.
 *
 * @see https://leetcode.com/problems/delete-columns-to-make-sorted/
 * @difficulty Easy
 * @timeComplexity O(n · L)
 * @spaceComplexity O(1)
 *
 * @example
 * deleteColumnsToMakeSorted(["cba", "daf", "ghi"]); // 1
 */
export const deleteColumnsToMakeSorted = (strs: readonly string[]): number => {
	let unsorted = 0;
	for (let c = 0; c < (strs[0]?.length ?? 0); c++) {
		if (
			strs.some(
				(row, r) => r > 0 && row.charAt(c) < (strs[r - 1] ?? "").charAt(c),
			)
		)
			unsorted++;
	}
	return unsorted;
};
