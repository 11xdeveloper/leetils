/**
 * 810. Chalkboard XOR Game
 *
 * Alice and Bob take turns erasing one number from the chalkboard; a player
 * who erases a number that makes the XOR of the remaining numbers 0 loses,
 * and a player who starts their turn with an XOR of 0 wins. Alice goes
 * first. Returns whether she wins with optimal play.
 *
 * Alice wins if the XOR is already 0. Otherwise, with an even count she
 * always has a safe move: if every number equalled the total XOR, the XOR
 * of an even count of them would be 0. Keeping the count even for her
 * turns, she wins; with an odd count, Bob is in that position instead.
 *
 * @see https://leetcode.com/problems/chalkboard-xor-game/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * chalkboardXorGame([1, 1, 2]); // false
 */
export const chalkboardXorGame = (nums: readonly number[]): boolean =>
	nums.length % 2 === 0 || nums.reduce((xor, num) => xor ^ num, 0) === 0;
