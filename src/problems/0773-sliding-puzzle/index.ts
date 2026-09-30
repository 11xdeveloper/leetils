/**
 * 773. Sliding Puzzle
 *
 * On a 2 × 3 board holding tiles 1–5 and an empty square 0, a move slides a
 * tile next to the empty square into it. Returns the fewest moves to reach
 * `[[1, 2, 3], [4, 5, 0]]`, or -1 if that's impossible.
 *
 * Breadth-first search over the 720 arrangements, written as strings.
 *
 * @see https://leetcode.com/problems/sliding-puzzle/
 * @difficulty Hard
 * @timeComplexity O(6!)
 * @spaceComplexity O(6!)
 *
 * @example
 * slidingPuzzle([[4, 1, 2], [5, 0, 3]]); // 5
 */
export const slidingPuzzle = (
	board: readonly (readonly number[])[],
): number => {
	const neighbours = [
		[1, 3],
		[0, 2, 4],
		[1, 5],
		[0, 4],
		[1, 3, 5],
		[2, 4],
	];
	const start = board.flat().join("");
	const seen = new Set([start]);
	let frontier = [start];

	for (let moves = 0; frontier.length > 0; moves++) {
		const next: string[] = [];
		for (const state of frontier) {
			if (state === "123450") return moves;
			const empty = state.indexOf("0");
			for (const from of neighbours[empty] ?? []) {
				const chars = [...state];
				[chars[empty], chars[from]] = [chars[from] ?? "", "0"];
				const moved = chars.join("");
				if (!seen.has(moved)) {
					seen.add(moved);
					next.push(moved);
				}
			}
		}
		frontier = next;
	}

	return -1;
};
