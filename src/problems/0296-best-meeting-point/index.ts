/**
 * 296. Best Meeting Point
 *
 * In a grid where each 1 is a friend's home, returns the smallest total
 * Manhattan distance for everyone to travel to one meeting point.
 *
 * Manhattan distance splits into a row part and a column part, and the
 * total along one axis is smallest at the median coordinate. Scanning the
 * grid by rows and then by columns lists each axis's coordinates already
 * sorted, so no sort is needed; the distance is then summed from the median.
 *
 * @see https://leetcode.com/problems/best-meeting-point/
 * @difficulty Hard
 * @timeComplexity O(m * n)
 * @spaceComplexity O(m * n)
 *
 * @example
 * bestMeetingPoint([[1, 0, 0, 0, 1], [0, 0, 0, 0, 0], [0, 0, 1, 0, 0]]); // 6
 */
export const bestMeetingPoint = (
	grid: readonly (readonly number[])[],
): number => {
	const rows: number[] = [];
	const columns: number[] = [];
	const width = grid[0]?.length ?? 0;

	for (const [r, row] of grid.entries()) {
		for (const [c, cell] of row.entries()) if (cell === 1) rows.push(r);
	}
	for (let c = 0; c < width; c++) {
		for (const row of grid) if (row[c] === 1) columns.push(c);
	}

	const distanceToMedian = (sorted: number[]): number => {
		const median = sorted[Math.floor(sorted.length / 2)] ?? 0;
		return sorted.reduce((total, x) => total + Math.abs(x - median), 0);
	};

	return distanceToMedian(rows) + distanceToMedian(columns);
};
