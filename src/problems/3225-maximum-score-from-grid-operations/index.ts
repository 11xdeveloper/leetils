/**
 * 3225. Maximum Score From Grid Operations
 *
 * Blacken the top `h_j` cells of each column j of an n × n grid, for heights
 * of your choice. The score adds up every white cell with a black cell
 * beside it horizontally. Returns the largest score.
 *
 * Column j scores its white cells below the taller of its neighbours'
 * heights, so walk across the columns keeping the best score for each pair
 * (previous height, current height), adding column j's score once the next
 * height is picked. For a fixed current height, the gain depends on the
 * previous height only through which of it and the next height is bigger,
 * so prefix and suffix maxima over the previous height make each step
 * O(n²).
 *
 * @see https://leetcode.com/problems/maximum-score-from-grid-operations/
 * @difficulty Hard
 * @timeComplexity O(n³)
 * @spaceComplexity O(n²)
 *
 * @example
 * maximumScoreFromGridOperations([[0, 0, 0, 0, 0], [0, 0, 3, 0, 0], [0, 1, 0, 0, 0], [5, 0, 0, 3, 0], [0, 0, 0, 0, 2]]); // 11
 */
export const maximumScoreFromGridOperations = (
	grid: readonly (readonly number[])[],
): number => {
	const n = grid.length;
	const size = n + 1;
	const NONE = Number.NEGATIVE_INFINITY;
	// column[h]: sum of the column's top h cells.
	const prefix = (j: number): Float64Array => {
		const sums = new Float64Array(size);
		for (let i = 0; i < n; i++)
			sums[i + 1] = (sums[i] ?? 0) + (grid[i]?.[j] ?? 0);
		return sums;
	};
	// best[p * size + c]: best score of the columns before j, with heights p (j - 1) and c (j).
	let best = new Float64Array(size * size).fill(NONE);
	for (let c = 0; c <= n; c++) best[c] = 0;
	for (let j = 0; j < n; j++) {
		const column = prefix(j);
		const gain = (top: number, c: number): number =>
			Math.max(0, (column[top] ?? 0) - (column[c] ?? 0));
		const next = new Float64Array(size * size).fill(NONE);
		const lastNext = j === n - 1 ? 0 : n;
		for (let c = 0; c <= n; c++) {
			const upTo = new Float64Array(size);
			const above = new Float64Array(size + 1).fill(NONE);
			for (let p = 0, running = NONE; p <= n; p++) {
				running = Math.max(running, best[p * size + c] ?? NONE);
				upTo[p] = running;
			}
			for (let p = n; p >= 0; p--)
				above[p] = Math.max(
					above[p + 1] ?? NONE,
					(best[p * size + c] ?? NONE) + gain(p, c),
				);
			for (let q = 0; q <= lastNext; q++) {
				const value = Math.max(
					(upTo[q] ?? NONE) + gain(q, c),
					above[q + 1] ?? NONE,
				);
				next[c * size + q] = value;
			}
		}
		best = next;
	}
	let answer = 0;
	for (const value of best) answer = Math.max(answer, value);
	return answer;
};
