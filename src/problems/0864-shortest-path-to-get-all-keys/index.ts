/**
 * 864. Shortest Path to Get All Keys
 *
 * In `grid`, `@` is the start, `#` a wall, `.` open, lowercase letters keys
 * and uppercase letters the locks they open. Returns the fewest moves (up,
 * down, left, right) to collect every key, or -1 if that's impossible.
 *
 * Breadth-first search over (cell, keys held) states, with the keys as a
 * bitmask; a lock can be passed only with its key.
 *
 * @see https://leetcode.com/problems/shortest-path-to-get-all-keys/
 * @difficulty Hard
 * @timeComplexity O(m · n · 2^k) for k keys
 * @spaceComplexity O(m · n · 2^k)
 *
 * @example
 * shortestPathToGetAllKeys(["@.a..", "###.#", "b.A.B"]); // 8
 */
export const shortestPathToGetAllKeys = (grid: readonly string[]): number => {
	const m = grid.length;
	const n = grid[0]?.length ?? 0;
	let keys = 0;
	let start = 0;
	for (const [r, row] of grid.entries()) {
		for (let c = 0; c < n; c++) {
			const cell = row.charAt(c);
			if (cell === "@") start = r * n + c;
			else if (/[a-f]/.test(cell))
				keys = Math.max(keys, cell.charCodeAt(0) - 96);
		}
	}
	const all = (1 << keys) - 1;

	const seen = new Uint8Array(m * n * (all + 1));
	seen[start * (all + 1)] = 1;
	let frontier: [cell: number, held: number][] = [[start, 0]];
	for (let moves = 0; frontier.length > 0; moves++) {
		const next: [number, number][] = [];
		for (const [cell, held] of frontier) {
			if (held === all) return moves;
			const [r, c] = [Math.floor(cell / n), cell % n];
			for (const [dr, dc] of [
				[-1, 0],
				[1, 0],
				[0, -1],
				[0, 1],
			] as const) {
				const [r2, c2] = [r + dr, c + dc];
				const square = grid[r2]?.charAt(c2) ?? "";
				if (square === "" || square === "#") continue;
				if (
					/[A-F]/.test(square) &&
					!(held & (1 << (square.charCodeAt(0) - 65)))
				)
					continue;
				const nextHeld = /[a-f]/.test(square)
					? held | (1 << (square.charCodeAt(0) - 97))
					: held;
				const state = (r2 * n + c2) * (all + 1) + nextHeld;
				if (seen[state]) continue;
				seen[state] = 1;
				next.push([r2 * n + c2, nextHeld]);
			}
		}
		frontier = next;
	}
	return -1;
};
