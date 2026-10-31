/**
 * 3360. Stone Removal Game
 *
 * Alice removes 10 stones, then each turn a player removes one fewer than
 * the last; whoever can't loses. Returns whether Alice wins with `n` stones.
 *
 * Play it out.
 *
 * @see https://leetcode.com/problems/stone-removal-game/
 * @difficulty Easy
 * @timeComplexity O(1)
 * @spaceComplexity O(1)
 *
 * @example
 * stoneRemovalGame(12); // true
 */
export const stoneRemovalGame = (n: number): boolean => {
	let left = n;
	let take = 10;
	let aliceTurn = true;
	while (take > 0 && left >= take) {
		left -= take;
		take--;
		aliceTurn = !aliceTurn;
	}
	return !aliceTurn;
};
