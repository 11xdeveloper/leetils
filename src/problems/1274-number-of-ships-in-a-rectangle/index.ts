/** The interface LeetCode provides for searching the sea. */
interface Sea {
	hasShips(topRight: readonly number[], bottomLeft: readonly number[]): boolean;
}

/**
 * 1274. Number of Ships in a Rectangle
 *
 * Counts the ships (at most 10, each on its own integer point) in the
 * rectangle from `bottomLeft` to `topRight`, using only
 * `sea.hasShips(topRight, bottomLeft)`, in at most 400 calls.
 *
 * Divide and conquer: an empty rectangle has no ships and a single point
 * with ships has one; otherwise split it into quarters and count each.
 * Only rectangles containing ships are split, so the search follows at
 * most 10 paths down about log2(1000) levels.
 *
 * @see https://leetcode.com/problems/number-of-ships-in-a-rectangle/
 * @difficulty Hard
 * @timeComplexity O(s · log(width)) calls for s ships
 * @spaceComplexity O(log(width))
 *
 * @example
 * numberOfShipsInARectangle({ hasShips: ([x2, y2], [x1, y1]) => x1 <= 1 && 1 <= x2 && y1 <= 1 && 1 <= y2 }, [4, 4], [0, 0]); // 1
 */
export const numberOfShipsInARectangle = (
	sea: Sea,
	topRight: readonly number[],
	bottomLeft: readonly number[],
): number => {
	const [x1 = 0, y1 = 0] = bottomLeft;
	const [x2 = 0, y2 = 0] = topRight;
	if (x1 > x2 || y1 > y2 || !sea.hasShips(topRight, bottomLeft)) return 0;
	if (x1 === x2 && y1 === y2) return 1;
	const [midX, midY] = [Math.floor((x1 + x2) / 2), Math.floor((y1 + y2) / 2)];
	return (
		numberOfShipsInARectangle(sea, [midX, midY], [x1, y1]) +
		numberOfShipsInARectangle(sea, [x2, midY], [midX + 1, y1]) +
		numberOfShipsInARectangle(sea, [midX, y2], [x1, midY + 1]) +
		numberOfShipsInARectangle(sea, [x2, y2], [midX + 1, midY + 1])
	);
};
