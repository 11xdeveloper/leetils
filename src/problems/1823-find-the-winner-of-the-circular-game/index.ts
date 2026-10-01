/**
 * 1823. Find the Winner of the Circular Game
 *
 * Friends `1 … n` sit in a circle; counting `k` around from the current
 * friend eliminates the last one counted, and counting resumes after them.
 * Returns the winner.
 *
 * The Josephus recurrence: with `i` friends the survivor's position is
 * `(survivor with i − 1 friends + k) mod i`.
 *
 * @see https://leetcode.com/problems/find-the-winner-of-the-circular-game/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * findTheWinnerOfTheCircularGame(5, 2); // 3
 */
export const findTheWinnerOfTheCircularGame = (
	n: number,
	k: number,
): number => {
	let survivor = 0;
	for (let friends = 2; friends <= n; friends++)
		survivor = (survivor + k) % friends;
	return survivor + 1;
};
