/**
 * 3274. Check if Two Chessboard Squares Have the Same Color
 *
 * Whether two chessboard squares, like `"a1"` and `"c3"`, are the same
 * color.
 *
 * A square's color is the parity of its file plus its rank.
 *
 * @see https://leetcode.com/problems/check-if-two-chessboard-squares-have-the-same-color/
 * @difficulty Easy
 * @timeComplexity O(1)
 * @spaceComplexity O(1)
 *
 * @example
 * checkIfTwoChessboardSquaresHaveTheSameColor("a1", "c3"); // true
 */
export const checkIfTwoChessboardSquaresHaveTheSameColor = (
	coordinate1: string,
	coordinate2: string,
): boolean => {
	const parity = (square: string): number =>
		(square.charCodeAt(0) + square.charCodeAt(1)) % 2;
	return parity(coordinate1) === parity(coordinate2);
};
