/**
 * 3531. Count Covered Buildings
 *
 * A building is covered if there are buildings above, below, left and
 * right of it in its row and column. Returns how many are covered.
 *
 * Record each row's and column's extreme positions; a building is covered
 * when it's strictly inside both.
 *
 * @see https://leetcode.com/problems/count-covered-buildings/
 * @difficulty Medium
 * @timeComplexity O(b)
 * @spaceComplexity O(n)
 *
 * @example
 * countCoveredBuildings(3, [[1, 2], [2, 2], [3, 2], [2, 1], [2, 3]]); // 1
 */
export const countCoveredBuildings = (
	n: number,
	buildings: readonly (readonly number[])[],
): number => {
	const rowMin = new Int32Array(n + 1).fill(n + 1);
	const rowMax = new Int32Array(n + 1);
	const colMin = new Int32Array(n + 1).fill(n + 1);
	const colMax = new Int32Array(n + 1);
	for (const [x = 0, y = 0] of buildings) {
		rowMin[x] = Math.min(rowMin[x] ?? 0, y);
		rowMax[x] = Math.max(rowMax[x] ?? 0, y);
		colMin[y] = Math.min(colMin[y] ?? 0, x);
		colMax[y] = Math.max(colMax[y] ?? 0, x);
	}
	return buildings.filter(
		([x = 0, y = 0]) =>
			(rowMin[x] ?? 0) < y &&
			y < (rowMax[x] ?? 0) &&
			(colMin[y] ?? 0) < x &&
			x < (colMax[y] ?? 0),
	).length;
};
