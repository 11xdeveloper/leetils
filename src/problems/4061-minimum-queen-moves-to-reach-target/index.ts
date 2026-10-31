/**
 * 4061. Minimum Queen Moves to Reach Target
 *
 * The fewest queen moves from `source` to `target` on an empty chessboard:
 * 0 if they're the same square, 1 if they share a row, column or
 * diagonal, otherwise 2.
 *
 * @see https://leetcode.com/problems/minimum-queen-moves-to-reach-target/
 * @difficulty Easy
 * @timeComplexity O(1)
 * @spaceComplexity O(1)
 *
 * @example
 * minimumQueenMovesToReachTarget([4, 2], [1, 3]); // 2
 */
export const minimumQueenMovesToReachTarget = (
	source: readonly number[],
	target: readonly number[],
): number => {
	const [sr = 0, sc = 0] = source;
	const [tr = 0, tc = 0] = target;
	if (sr === tr && sc === tc) return 0;
	if (sr === tr || sc === tc || Math.abs(sr - tr) === Math.abs(sc - tc))
		return 1;
	return 2;
};
