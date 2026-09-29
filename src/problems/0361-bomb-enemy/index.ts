/**
 * 361. Bomb Enemy
 *
 * In a grid of walls (`"W"`), enemies (`"E"`) and empty cells (`"0"`),
 * returns the most enemies one bomb placed on an empty cell can kill. A bomb
 * kills every enemy in its row and column up to the nearest walls.
 *
 * Counts each wall-to-wall segment's enemies only once. Scanning row by
 * row, the count for the current row segment is recomputed at its start
 * (the left edge or just after a wall), and each column keeps the count for
 * its current segment, recomputed just after a wall.
 *
 * @see https://leetcode.com/problems/bomb-enemy/
 * @difficulty Medium
 * @timeComplexity O(m * n)
 * @spaceComplexity O(n)
 *
 * @example
 * bombEnemy([["0", "E", "0", "0"], ["E", "0", "W", "E"], ["0", "E", "0", "0"]]); // 3
 */
export const bombEnemy = (grid: readonly (readonly string[])[]): number => {
	const rows = grid.length;
	const columns = grid[0]?.length ?? 0;
	const columnHits = new Array<number>(columns).fill(0);
	let best = 0;

	for (let r = 0; r < rows; r++) {
		let rowHits = 0;
		for (let c = 0; c < columns; c++) {
			if (c === 0 || grid[r]?.[c - 1] === "W") {
				rowHits = 0;
				for (let k = c; k < columns && grid[r]?.[k] !== "W"; k++)
					if (grid[r]?.[k] === "E") rowHits++;
			}
			if (r === 0 || grid[r - 1]?.[c] === "W") {
				let hits = 0;
				for (let k = r; k < rows && grid[k]?.[c] !== "W"; k++)
					if (grid[k]?.[c] === "E") hits++;
				columnHits[c] = hits;
			}
			if (grid[r]?.[c] === "0")
				best = Math.max(best, rowHits + (columnHits[c] ?? 0));
		}
	}

	return best;
};
