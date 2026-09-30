/**
 * 1263. Minimum Moves to Move a Box to Their Target Location
 *
 * In a warehouse grid of walls (`#`), floor (`.`), the player (`S`), a box
 * (`B`) and a target (`T`), returns the fewest pushes that get the box onto
 * the target, or -1. The player walks freely on floor but can't pass
 * through the box, and pushes it by walking into it.
 *
 * 0-1 breadth-first search over (box, player) positions: walking costs
 * nothing and pushing costs one, so states are handled in rounds by number
 * of pushes, with walks staying in the current round.
 *
 * @see https://leetcode.com/problems/minimum-moves-to-move-a-box-to-their-target-location/
 * @difficulty Hard
 * @timeComplexity O((mn)^2)
 * @spaceComplexity O((mn)^2)
 *
 * @example
 * minimumMovesToMoveABoxToTheirTargetLocation([["#", "#", "#", "#", "#", "#"], ["#", "T", "#", "#", "#", "#"], ["#", ".", ".", "B", ".", "#"], ["#", ".", "#", "#", ".", "#"], ["#", ".", ".", ".", "S", "#"], ["#", "#", "#", "#", "#", "#"]]); // 3
 */
export const minimumMovesToMoveABoxToTheirTargetLocation = (
	grid: readonly (readonly string[])[],
): number => {
	const m = grid.length;
	const n = grid[0]?.length ?? 0;
	const cells = m * n;
	let [player, box, target] = [0, 0, 0];
	for (let r = 0; r < m; r++) {
		for (let c = 0; c < n; c++) {
			const char = grid[r]?.[c];
			if (char === "S") player = r * n + c;
			else if (char === "B") box = r * n + c;
			else if (char === "T") target = r * n + c;
		}
	}
	const open = (r: number, c: number) =>
		r >= 0 && r < m && c >= 0 && c < n && grid[r]?.[c] !== "#";

	// A state is box * cells + player. Each round handles every state reached
	// with the same number of pushes: walks add to this round, pushes to the next.
	const done = new Uint8Array(cells * cells);
	let round = [box * cells + player];
	for (let pushes = 0; round.length > 0; pushes++) {
		const next: number[] = [];
		for (let i = 0; i < round.length; i++) {
			const state = round[i] ?? 0;
			if (done[state]) continue;
			done[state] = 1;
			const [boxAt, playerAt] = [Math.floor(state / cells), state % cells];
			if (boxAt === target) return pushes;
			const [pr, pc] = [Math.floor(playerAt / n), playerAt % n];
			for (const [dr, dc] of [
				[-1, 0],
				[1, 0],
				[0, -1],
				[0, 1],
			] as const) {
				const [r, c] = [pr + dr, pc + dc];
				if (!open(r, c)) continue;
				const step = r * n + c;
				if (step !== boxAt) {
					if (!done[boxAt * cells + step]) round.push(boxAt * cells + step);
					continue;
				}
				const [br, bc] = [r + dr, c + dc];
				if (open(br, bc) && !done[(br * n + bc) * cells + step]) {
					next.push((br * n + bc) * cells + step);
				}
			}
		}
		round = next;
	}
	return -1;
};
