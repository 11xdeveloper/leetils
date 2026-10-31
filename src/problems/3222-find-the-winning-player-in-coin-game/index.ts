/**
 * 3222. Find the Winning Player in Coin Game
 *
 * With `x` coins of 75 and `y` coins of 10, players take turns picking coins
 * worth exactly 115, starting with Alice; whoever can't loses.
 *
 * Every turn takes one 75 and four 10s, so the game lasts
 * min(x, ⌊y / 4⌋) turns and Alice wins if that's odd.
 *
 * @see https://leetcode.com/problems/find-the-winning-player-in-coin-game/
 * @difficulty Easy
 * @timeComplexity O(1)
 * @spaceComplexity O(1)
 *
 * @example
 * findTheWinningPlayerInCoinGame(2, 7); // "Alice"
 */
export const findTheWinningPlayerInCoinGame = (
	x: number,
	y: number,
): "Alice" | "Bob" =>
	Math.min(x, Math.floor(y / 4)) % 2 === 1 ? "Alice" : "Bob";
