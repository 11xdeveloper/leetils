/**
 * 1210. Minimum Moves to Reach Target with Rotations
 *
 * A two-cell snake starts horizontal at the top-left of an `n × n` grid (0
 * for empty, 1 for blocked) and must reach the bottom-right, horizontal.
 * It can move right or down, or rotate about its top-left cell when the
 * 2 × 2 square it swings through is empty. Returns the fewest moves, or -1.
 *
 * Breadth-first search over (tail cell, orientation) states.
 *
 * @see https://leetcode.com/problems/minimum-moves-to-reach-target-with-rotations/
 * @difficulty Hard
 * @timeComplexity O(n^2)
 * @spaceComplexity O(n^2)
 *
 * @example
 * minimumMovesToReachTargetWithRotations([[0, 0, 1, 1, 1, 1], [0, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 1], [1, 1, 1, 0, 0, 1], [1, 1, 1, 0, 0, 1], [1, 1, 1, 0, 0, 0]]); // 9
 */
export const minimumMovesToReachTargetWithRotations = (
	grid: readonly (readonly number[])[],
): number => {
	const n = grid.length;
	const empty = (r: number, c: number) => grid[r]?.[c] === 0;
	// A state is (r * n + c) * 2 + orientation, 0 for horizontal and 1 for vertical.
	const seen = new Uint8Array(2 * n * n);
	const target = ((n - 1) * n + (n - 2)) * 2;
	let frontier = [0];
	seen[0] = 1;
	for (let moves = 0; frontier.length > 0; moves++) {
		const next: number[] = [];
		const visit = (r: number, c: number, vertical: number) => {
			const state = (r * n + c) * 2 + vertical;
			if (seen[state]) return;
			seen[state] = 1;
			next.push(state);
		};
		for (const state of frontier) {
			if (state === target) return moves;
			const vertical = state & 1;
			const cell = state >> 1;
			const [r, c] = [Math.floor(cell / n), cell % n];
			if (vertical === 0) {
				if (empty(r, c + 2)) visit(r, c + 1, 0);
				if (empty(r + 1, c) && empty(r + 1, c + 1)) {
					visit(r + 1, c, 0);
					visit(r, c, 1);
				}
			} else {
				if (empty(r + 2, c)) visit(r + 1, c, 1);
				if (empty(r, c + 1) && empty(r + 1, c + 1)) {
					visit(r, c + 1, 1);
					visit(r, c, 0);
				}
			}
		}
		frontier = next;
	}
	return -1;
};
