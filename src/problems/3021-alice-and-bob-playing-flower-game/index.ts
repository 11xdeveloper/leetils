/**
 * 3021. Alice and Bob Playing Flower Game
 *
 * Alice and Bob take turns picking one flower from either side of a circle
 * with `x` flowers one way and `y` the other, and whoever takes the last
 * flower wins. Returns how many pairs with `1 ≤ x ≤ n` and `1 ≤ y ≤ m` let
 * Alice, who goes first, win.
 *
 * Alice takes the last flower exactly when `x + y` is odd, which happens
 * for an odd x with an even y or the other way round: `⌊n · m / 2⌋` pairs.
 *
 * @see https://leetcode.com/problems/alice-and-bob-playing-flower-game/
 * @difficulty Medium
 * @timeComplexity O(1)
 * @spaceComplexity O(1)
 *
 * @example
 * aliceAndBobPlayingFlowerGame(3, 2); // 3
 */
export const aliceAndBobPlayingFlowerGame = (n: number, m: number): number =>
	Math.floor(n / 2) * Math.ceil(m / 2) + Math.ceil(n / 2) * Math.floor(m / 2);
