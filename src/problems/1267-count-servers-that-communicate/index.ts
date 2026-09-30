/**
 * 1267. Count Servers that Communicate
 *
 * In a grid where 1 marks a server, two servers communicate if they share a
 * row or column. Returns how many servers communicate with at least one
 * other.
 *
 * Counts the servers in each row and column; a server communicates when
 * its row or column holds another.
 *
 * @see https://leetcode.com/problems/count-servers-that-communicate/
 * @difficulty Medium
 * @timeComplexity O(mn)
 * @spaceComplexity O(m + n)
 *
 * @example
 * countServersThatCommunicate([[1, 1, 0, 0], [0, 0, 1, 0], [0, 0, 1, 0], [0, 0, 0, 1]]); // 4
 */
export const countServersThatCommunicate = (
	grid: readonly (readonly number[])[],
): number => {
	const rows = grid.map((row) => row.reduce((sum, cell) => sum + cell, 0));
	const columns = new Array<number>(grid[0]?.length ?? 0).fill(0);
	for (const row of grid)
		row.forEach((cell, c) => {
			columns[c] = (columns[c] ?? 0) + cell;
		});
	let count = 0;
	grid.forEach((row, r) => {
		row.forEach((cell, c) => {
			if (cell === 1 && ((rows[r] ?? 0) > 1 || (columns[c] ?? 0) > 1)) count++;
		});
	});
	return count;
};
