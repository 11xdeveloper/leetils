/**
 * 2682. Find the Losers of the Circular Game
 *
 * `n` friends sit in a circle; friend 1 starts with the ball, and on turn
 * `i` it is passed `i · k` places clockwise. The game ends when someone
 * gets it a second time. Returns, in order, the friends who never got it.
 *
 * Simulate the passes.
 *
 * @see https://leetcode.com/problems/find-the-losers-of-the-circular-game/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * findTheLosersOfTheCircularGame(5, 2); // [4, 5]
 */
export const findTheLosersOfTheCircularGame = (
	n: number,
	k: number,
): number[] => {
	const received = new Uint8Array(n);
	for (let friend = 0, turn = 1; !received[friend]; turn++) {
		received[friend] = 1;
		friend = (friend + turn * k) % n;
	}
	const losers: number[] = [];
	for (let friend = 0; friend < n; friend++)
		if (!received[friend]) losers.push(friend + 1);
	return losers;
};
