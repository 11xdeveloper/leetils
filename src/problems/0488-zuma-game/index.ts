/**
 * 488. Zuma Game
 *
 * `board` is a row of coloured balls (`R`, `Y`, `B`, `G`, `W`) and `hand`
 * the balls you hold. Each turn you insert a ball from your hand anywhere
 * in the row; any group of three or more of the same colour then vanishes,
 * which can make neighbouring groups meet and vanish too. Returns the
 * fewest balls needed to clear the board, or -1 if it can't be done.
 *
 * Breadth-first search over (board, remaining hand) states, so the first
 * cleared board uses the fewest balls. Most insertions are pointless and
 * skipped: a ball is only inserted before a ball of its own colour (and not
 * after another of that colour, which gives the same board), or between two
 * equal balls of a different colour, to split them. Equal balls in the hand
 * are tried once.
 *
 * @see https://leetcode.com/problems/zuma-game/
 * @difficulty Hard
 * @timeComplexity O((b + h)! / h!) states in the worst case, far fewer with pruning
 * @spaceComplexity O(number of states)
 *
 * @example
 * zumaGame("WWRRBBWW", "WRBRW"); // 2
 */
export const zumaGame = (board: string, hand: string): number => {
	const settle = (row: string): string => {
		for (
			let next = row.replace(/(.)\1{2,}/, "");
			next !== row;
			next = row.replace(/(.)\1{2,}/, "")
		)
			row = next;
		return row;
	};

	const start = { board, hand: [...hand].sort().join("") };
	const seen = new Set([`${start.board} ${start.hand}`]);
	let frontier = [start];

	for (let used = 1; frontier.length > 0; used++) {
		const next: typeof frontier = [];
		for (const state of frontier) {
			for (let i = 0; i <= state.board.length; i++) {
				for (let j = 0; j < state.hand.length; j++) {
					const ball = state.hand.charAt(j);
					if (j > 0 && ball === state.hand.charAt(j - 1)) continue;
					const before = state.board.charAt(i - 1);
					const after = state.board.charAt(i);
					if (i > 0 && before === ball) continue;
					if (
						!(after === ball || (i > 0 && before === after && after !== ball))
					)
						continue;

					const board = settle(
						state.board.slice(0, i) + ball + state.board.slice(i),
					);
					if (board === "") return used;
					const hand = state.hand.slice(0, j) + state.hand.slice(j + 1);
					const key = `${board} ${hand}`;
					if (!seen.has(key)) {
						seen.add(key);
						next.push({ board, hand });
					}
				}
			}
		}
		frontier = next;
	}

	return -1;
};
