/**
 * 1812. Determine Color of a Chessboard Square
 *
 * Returns whether the chessboard square `coordinates` (like `"a1"`) is
 * white.
 *
 * `a1` is black, and colours alternate, so a square is white when its file
 * and rank indices have different parities.
 *
 * @see https://leetcode.com/problems/determine-color-of-a-chessboard-square/
 * @difficulty Easy
 * @timeComplexity O(1)
 * @spaceComplexity O(1)
 *
 * @example
 * determineColorOfAChessboardSquare("h3"); // true
 */
export const determineColorOfAChessboardSquare = (
	coordinates: string,
): boolean => (coordinates.charCodeAt(0) + coordinates.charCodeAt(1)) % 2 === 1;
