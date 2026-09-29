/**
 * 657. Robot Return to Origin
 *
 * A robot starting at the origin makes the moves in `moves` (`U`, `D`, `L`,
 * `R`). Returns whether it ends where it started.
 *
 * It returns exactly when it moved up as often as down and left as often
 * as right.
 *
 * @see https://leetcode.com/problems/robot-return-to-origin/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * robotReturnToOrigin("UD"); // true
 */
export const robotReturnToOrigin = (moves: string): boolean => {
	let x = 0;
	let y = 0;
	for (const move of moves) {
		if (move === "U") y++;
		else if (move === "D") y--;
		else if (move === "L") x--;
		else x++;
	}
	return x === 0 && y === 0;
};
