/**
 * 3127. Make a Square with the Same Color
 *
 * Whether changing at most one cell of a 3 × 3 grid of `B`s and `W`s can
 * make some 2 × 2 square a single color.
 *
 * A 2 × 2 square works if at least three of its cells already match.
 *
 * @see https://leetcode.com/problems/make-a-square-with-the-same-color/
 * @difficulty Easy
 * @timeComplexity O(1)
 * @spaceComplexity O(1)
 *
 * @example
 * makeASquareWithTheSameColor([["B", "W", "B"], ["B", "W", "W"], ["B", "W", "B"]]); // true
 */
export const makeASquareWithTheSameColor = (
	grid: readonly (readonly string[])[],
): boolean => {
	for (let r = 0; r < 2; r++)
		for (let c = 0; c < 2; c++) {
			let black = 0;
			for (const [dr, dc] of [
				[0, 0],
				[0, 1],
				[1, 0],
				[1, 1],
			] as const)
				if (grid[r + dr]?.[c + dc] === "B") black++;
			if (black !== 2) return true;
		}
	return false;
};
