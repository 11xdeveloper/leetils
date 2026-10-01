/**
 * 955. Delete Columns to Make Sorted II
 *
 * The equal-length strings `strs` form a grid, one per row. Returns the
 * fewest columns to delete so the remaining rows are in lexicographic
 * order.
 *
 * Greedy, column by column from the left: a column must go if it puts some
 * pair of neighbouring rows out of order that earlier kept columns haven't
 * already separated. Keeping a column is never worse, and pairs it
 * separates stay sorted whatever comes after.
 *
 * @see https://leetcode.com/problems/delete-columns-to-make-sorted-ii/
 * @difficulty Medium
 * @timeComplexity O(n · L)
 * @spaceComplexity O(n)
 *
 * @example
 * deleteColumnsToMakeSortedII(["ca", "bb", "ac"]); // 1
 */
export const deleteColumnsToMakeSortedII = (
	strs: readonly string[],
): number => {
	const settled = new Array<boolean>(strs.length).fill(false);
	let deleted = 0;
	for (let c = 0; c < (strs[0]?.length ?? 0); c++) {
		const breaks = strs.some(
			(row, r) =>
				r > 0 && !settled[r] && row.charAt(c) < (strs[r - 1] ?? "").charAt(c),
		);
		if (breaks) {
			deleted++;
			continue;
		}
		for (let r = 1; r < strs.length; r++)
			if ((strs[r] ?? "").charAt(c) > (strs[r - 1] ?? "").charAt(c))
				settled[r] = true;
	}
	return deleted;
};
