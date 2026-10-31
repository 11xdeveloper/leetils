/**
 * 2660. Determine the Winner of a Bowling Game
 *
 * A turn scores double if either of the player's two previous turns
 * knocked down all 10 pins. Returns 1 if the first player scores more, 2
 * if the second does, or 0 for a draw.
 *
 * Score each player's turns directly.
 *
 * @see https://leetcode.com/problems/determine-the-winner-of-a-bowling-game/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * determineTheWinnerOfABowlingGame([4, 10, 7, 9], [6, 5, 2, 3]); // 1
 */
export const determineTheWinnerOfABowlingGame = (
	player1: readonly number[],
	player2: readonly number[],
): number => {
	const score = (pins: readonly number[]): number =>
		pins.reduce(
			(total, x, i) =>
				total + (pins[i - 1] === 10 || pins[i - 2] === 10 ? 2 * x : x),
			0,
		);
	const a = score(player1);
	const b = score(player2);
	if (a > b) return 1;
	if (b > a) return 2;
	return 0;
};
