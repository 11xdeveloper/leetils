/**
 * 2027. Minimum Moves to Convert String
 *
 * A move turns three consecutive characters of `s` into "O". Returns the
 * fewest moves to turn every "X" into "O".
 *
 * Greedily start a move at each leftmost remaining "X".
 *
 * @see https://leetcode.com/problems/minimum-moves-to-convert-string/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * minimumMovesToConvertString("XXOX"); // 2
 */
export const minimumMovesToConvertString = (s: string): number => {
	let moves = 0;
	for (let i = 0; i < s.length; i++) {
		if (s[i] !== "X") continue;
		moves++;
		i += 2;
	}
	return moves;
};
