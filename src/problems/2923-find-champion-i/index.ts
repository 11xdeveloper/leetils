/**
 * 2923. Find Champion I
 *
 * `grid[i][j]` is 1 when team `i` is stronger than team `j`. Returns the
 * team no other team is stronger than.
 *
 * The champion beats every other team, so its row has `n - 1` ones.
 *
 * @see https://leetcode.com/problems/find-champion-i/
 * @difficulty Easy
 * @timeComplexity O(n²)
 * @spaceComplexity O(1)
 *
 * @example
 * findChampionI([[0, 0, 1], [1, 0, 1], [0, 0, 0]]); // 1
 */
export const findChampionI = (grid: readonly (readonly number[])[]): number =>
	grid.findIndex(
		(row) => row.reduce((sum, beat) => sum + beat, 0) === grid.length - 1,
	);
