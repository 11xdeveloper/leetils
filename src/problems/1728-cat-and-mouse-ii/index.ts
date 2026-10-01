const MOUSE_WINS = 1;
const CAT_WINS = 2;

/**
 * 1728. Cat and Mouse II
 *
 * On `grid` (walls `#`, food `F`), Mouse `M` and then Cat `C` take turns
 * jumping up to `mouseJump` / `catJump` cells in a straight line, or
 * staying. Cat wins by catching Mouse or reaching the food first; Mouse
 * wins by reaching the food first. Returns whether Mouse can force a win.
 *
 * Retrograde analysis over states (mouse cell, cat cell, whose turn).
 * Start from the decided states and work backward: a state is won for the
 * player to move if some move reaches a state they win, and lost once
 * every move reaches a state the opponent wins. States never decided are
 * endless games, which Cat wins by the turn limit.
 *
 * @see https://leetcode.com/problems/cat-and-mouse-ii/
 * @difficulty Hard
 * @timeComplexity O(C^2 · (R + C)) for C cells of an R × C grid
 * @spaceComplexity O(C^2)
 *
 * @example
 * catAndMouseII(["####F", "#C...", "M...."], 1, 2); // true
 */
export const catAndMouseII = (
	grid: readonly string[],
	catJump: number,
	mouseJump: number,
): boolean => {
	const [rows, cols] = [grid.length, grid[0]?.length ?? 0];
	const cells = rows * cols;
	let [mouseStart, catStart, food] = [0, 0, 0];
	for (let r = 0; r < rows; r++) {
		for (let c = 0; c < cols; c++) {
			const char = grid[r]?.[c];
			if (char === "M") mouseStart = r * cols + c;
			else if (char === "C") catStart = r * cols + c;
			else if (char === "F") food = r * cols + c;
		}
	}
	const movesFrom = (jump: number) =>
		Array.from({ length: cells }, (_, cell) => {
			const [r, c] = [Math.floor(cell / cols), cell % cols];
			if (grid[r]?.[c] === "#") return [];
			const moves = [cell];
			for (const [dr, dc] of [
				[1, 0],
				[-1, 0],
				[0, 1],
				[0, -1],
			] as const) {
				for (let step = 1; step <= jump; step++) {
					const [nr, nc] = [r + dr * step, c + dc * step];
					if (
						nr < 0 ||
						nr >= rows ||
						nc < 0 ||
						nc >= cols ||
						grid[nr]?.[nc] === "#"
					)
						break;
					moves.push(nr * cols + nc);
				}
			}
			return moves;
		});
	const moves = [movesFrom(mouseJump), movesFrom(catJump)];
	// State index: (mouse · cells + cat) · 2 + turn, with turn 0 for Mouse to move.
	const state = (mouse: number, cat: number, turn: number) =>
		(mouse * cells + cat) * 2 + turn;
	const result = new Uint8Array(cells * cells * 2);
	const remaining = new Uint16Array(cells * cells * 2);
	const queue: number[] = [];
	for (let mouse = 0; mouse < cells; mouse++) {
		for (let cat = 0; cat < cells; cat++) {
			for (let turn = 0; turn < 2; turn++) {
				const s = state(mouse, cat, turn);
				remaining[s] =
					(turn === 0 ? moves[0]?.[mouse] : moves[1]?.[cat])?.length ?? 0;
				const outcome =
					mouse === cat || cat === food
						? CAT_WINS
						: mouse === food
							? MOUSE_WINS
							: 0;
				if (
					outcome === 0 ||
					(moves[0]?.[mouse]?.length ?? 0) === 0 ||
					(moves[1]?.[cat]?.length ?? 0) === 0
				)
					continue;
				result[s] = outcome;
				queue.push(s);
			}
		}
	}
	for (let head = 0; head < queue.length; head++) {
		const s = queue[head] ?? 0;
		const turn = s % 2;
		const [mouse, cat] = [Math.floor(s / 2 / cells), Math.floor(s / 2) % cells];
		const outcome = result[s] ?? 0;
		// The previous move was made by the other player.
		const mover = 1 - turn;
		for (const from of (mover === 0 ? moves[0]?.[mouse] : moves[1]?.[cat]) ??
			[]) {
			const previous =
				mover === 0 ? state(from, cat, 0) : state(mouse, from, 1);
			if (result[previous]) continue;
			const moverWins = outcome === (mover === 0 ? MOUSE_WINS : CAT_WINS);
			if (moverWins) {
				result[previous] = outcome;
				queue.push(previous);
			} else {
				remaining[previous] = (remaining[previous] ?? 0) - 1;
				if (remaining[previous] === 0) {
					result[previous] = outcome;
					queue.push(previous);
				}
			}
		}
	}
	return result[state(mouseStart, catStart, 0)] === MOUSE_WINS;
};
