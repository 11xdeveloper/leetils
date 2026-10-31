/**
 * 3394. Check if Grid can be Cut into Sections
 *
 * Whether two parallel cuts (both horizontal or both vertical) can split an
 * n × n grid into three sections, each with at least one of the
 * non-overlapping rectangles and no rectangle crossing a cut.
 *
 * Along each axis, merge the rectangles' extents where they overlap; a cut
 * fits in each gap between merged groups, so three groups are enough.
 *
 * @see https://leetcode.com/problems/check-if-grid-can-be-cut-into-sections/
 * @difficulty Medium
 * @timeComplexity O(r log r)
 * @spaceComplexity O(r)
 *
 * @example
 * checkIfGridCanBeCutIntoSections(5, [[1, 0, 5, 2], [0, 2, 2, 4], [3, 2, 5, 3], [0, 4, 4, 5]]); // true
 */
export const checkIfGridCanBeCutIntoSections = (
	_n: number,
	rectangles: readonly (readonly number[])[],
): boolean => {
	const groups = (low: number, high: number): number => {
		const spans = rectangles
			.map((r) => [r[low] ?? 0, r[high] ?? 0] as const)
			.sort((a, b) => a[0] - b[0]);
		let count = 0;
		let reach = Number.NEGATIVE_INFINITY;
		for (const [start, end] of spans) {
			if (start >= reach) count++;
			reach = Math.max(reach, end);
		}
		return count;
	};
	return groups(0, 2) >= 3 || groups(1, 3) >= 3;
};
