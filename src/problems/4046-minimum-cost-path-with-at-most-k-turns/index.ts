/**
 * 4046. Minimum Cost Path With At Most K Turns
 *
 * Walk from the top-left to the bottom-right of `grid` in any of the four
 * directions, paying each visited cell's cost every time. Returns the
 * cheapest walk with at most `k` changes of direction, or -1.
 *
 * Layer by turns used. Within a layer every move goes straight, so each
 * direction's costs come from one sweep along that direction; the next
 * layer starts where some other direction's walk stopped and turned.
 *
 * @see https://leetcode.com/problems/minimum-cost-path-with-at-most-k-turns/
 * @difficulty Hard
 * @timeComplexity O(k · m · n)
 * @spaceComplexity O(m · n)
 *
 * @example
 * minimumCostPathWithAtMostKTurns([[4, 1, 9], [3, 2, 5], [4, 8, 6]], 2); // 20
 */
export const minimumCostPathWithAtMostKTurns = (
	grid: readonly (readonly number[])[],
	k: number,
): number => {
	const m = grid.length;
	const n = grid[0]?.length ?? 0;
	const cells = m * n;
	if (cells === 1) return grid[0]?.[0] ?? 0;
	const INF = Number.POSITIVE_INFINITY;
	const directions = [
		[0, 1],
		[1, 0],
		[0, -1],
		[-1, 0],
	] as const;
	// layer[d * cells + cell]: cheapest arrival at cell moving in direction d.
	let layer = new Float64Array(4 * cells).fill(INF);
	let answer = INF;
	for (let turns = 0; turns <= k; turns++) {
		const next = new Float64Array(4 * cells).fill(INF);
		directions.forEach(([dr, dc], d) => {
			const base = (cell: number): number => {
				if (turns === 0) return cell === 0 ? (grid[0]?.[0] ?? 0) : INF;
				let best = INF;
				for (let other = 0; other < 4; other++)
					if (other !== d)
						best = Math.min(best, layer[other * cells + cell] ?? INF);
				return best;
			};
			// Sweep along d so each cell's predecessor is already done.
			const rows =
				dr > 0 ? [...Array(m).keys()] : [...Array(m).keys()].reverse();
			const cols =
				dc > 0 ? [...Array(n).keys()] : [...Array(n).keys()].reverse();
			for (const r of rows)
				for (const c of cols) {
					const cell = r * n + c;
					const [pr, pc] = [r - dr, c - dc];
					let value = base(cell);
					if (pr >= 0 && pc >= 0 && pr < m && pc < n)
						value = Math.min(
							value,
							(next[d * cells + pr * n + pc] ?? INF) + (grid[r]?.[c] ?? 0),
						);
					next[d * cells + cell] = value;
				}
			answer = Math.min(answer, next[d * cells + cells - 1] ?? INF);
		});
		layer = next;
	}
	return answer === INF ? -1 : answer;
};
