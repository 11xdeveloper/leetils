/**
 * 2387. Median of a Row Wise Sorted Matrix
 *
 * Returns the median of an `m × n` matrix (odd number of cells) whose rows
 * are sorted.
 *
 * Binary search the value: the median is the smallest `x` with more than
 * half the cells at most `x`, counted by binary search in each row.
 *
 * @see https://leetcode.com/problems/median-of-a-row-wise-sorted-matrix/
 * @difficulty Medium
 * @timeComplexity O(m log n log V) for values up to V
 * @spaceComplexity O(1)
 *
 * @example
 * medianOfARowWiseSortedMatrix([[1, 1, 2], [2, 3, 3], [1, 3, 4]]); // 2
 */
export const medianOfARowWiseSortedMatrix = (
	grid: readonly (readonly number[])[],
): number => {
	const half = Math.floor((grid.length * (grid[0]?.length ?? 0)) / 2);
	const atMost = (x: number): number =>
		grid.reduce((count, row) => {
			let [lo, hi] = [0, row.length];
			while (lo < hi) {
				const mid = (lo + hi) >> 1;
				if ((row[mid] ?? 0) <= x) lo = mid + 1;
				else hi = mid;
			}
			return count + lo;
		}, 0);
	let [lo, hi] = [
		Math.min(...grid.map((row) => row[0] ?? 0)),
		Math.max(...grid.map((row) => row.at(-1) ?? 0)),
	];
	while (lo < hi) {
		const mid = Math.floor((lo + hi) / 2);
		if (atMost(mid) > half) hi = mid;
		else lo = mid + 1;
	}
	return lo;
};
