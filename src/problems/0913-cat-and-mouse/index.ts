/**
 * 913. Cat and Mouse
 *
 * On an undirected graph, the mouse starts at node 1 and moves first, the
 * cat starts at node 2, and they alternate moving along an edge. The mouse
 * wins by reaching node 0 (which the cat can't enter), the cat by landing
 * on the mouse, and a repeated position is a draw. Returns 1 if the mouse
 * wins with optimal play, 2 if the cat does, or 0 for a draw.
 *
 * Retrograde analysis over (mouse, cat, whose turn) states. Starting from
 * the decided positions, it works backwards: a state is a win for the
 * player to move if any move reaches a win for them, and a loss once every
 * move leads to a loss. States never decided are draws.
 *
 * @see https://leetcode.com/problems/cat-and-mouse/
 * @difficulty Hard
 * @timeComplexity O(n^3)
 * @spaceComplexity O(n^2)
 *
 * @example
 * catAndMouse([[2, 5], [3], [0, 4, 5], [1, 4, 5], [2, 3], [0, 2, 3]]); // 0
 */
export const catAndMouse = (graph: readonly (readonly number[])[]): number => {
	const n = graph.length;
	const MOUSE_WINS = 1;
	const CAT_WINS = 2;
	const index = (mouse: number, cat: number, turn: number): number =>
		(mouse * n + cat) * 2 + turn;
	const result = new Uint8Array(n * n * 2);
	const movesLeft = new Int32Array(n * n * 2);
	for (let mouse = 0; mouse < n; mouse++) {
		for (let cat = 0; cat < n; cat++) {
			movesLeft[index(mouse, cat, 0)] = graph[mouse]?.length ?? 0;
			movesLeft[index(mouse, cat, 1)] = (graph[cat] ?? []).filter(
				(next) => next !== 0,
			).length;
		}
	}

	const queue: [mouse: number, cat: number, turn: number][] = [];
	for (let cat = 1; cat < n; cat++) {
		for (const turn of [0, 1]) {
			result[index(0, cat, turn)] = MOUSE_WINS;
			queue.push([0, cat, turn]);
			result[index(cat, cat, turn)] = CAT_WINS;
			queue.push([cat, cat, turn]);
		}
	}

	for (const [mouse, cat, turn] of queue) {
		const outcome = result[index(mouse, cat, turn)] ?? 0;
		// The previous move was made by the other player.
		const previousTurn = 1 - turn;
		const parents: [number, number][] =
			previousTurn === 0
				? (graph[mouse] ?? []).map((from): [number, number] => [from, cat])
				: (graph[cat] ?? [])
						.filter((from) => from !== 0)
						.map((from): [number, number] => [mouse, from]);
		for (const [parentMouse, parentCat] of parents) {
			const parent = index(parentMouse, parentCat, previousTurn);
			if (result[parent]) continue;
			const moverWins =
				(previousTurn === 0 && outcome === MOUSE_WINS) ||
				(previousTurn === 1 && outcome === CAT_WINS);
			if (moverWins) {
				result[parent] = outcome;
				queue.push([parentMouse, parentCat, previousTurn]);
			} else {
				movesLeft[parent] = (movesLeft[parent] ?? 0) - 1;
				if (movesLeft[parent] === 0) {
					result[parent] = outcome;
					queue.push([parentMouse, parentCat, previousTurn]);
				}
			}
		}
	}

	return result[index(1, 2, 0)] ?? 0;
};
