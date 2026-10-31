/**
 * 3968. Maximum Manhattan Distance After All Moves
 *
 * Follow `moves` from the origin, where each "_" may be any direction.
 * Returns the largest Manhattan distance reachable at the end.
 *
 * The fixed moves leave |U - D| + |L - R|, and every wildcard can extend
 * whichever direction that already leans.
 *
 * @see https://leetcode.com/problems/maximum-manhattan-distance-after-all-moves/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * maximumManhattanDistanceAfterAllMoves("L_D_"); // 4
 */
export const maximumManhattanDistanceAfterAllMoves = (
	moves: string,
): number => {
	let [x, y, free] = [0, 0, 0];
	for (const move of moves) {
		if (move === "U") y++;
		else if (move === "D") y--;
		else if (move === "R") x++;
		else if (move === "L") x--;
		else free++;
	}
	return Math.abs(x) + Math.abs(y) + free;
};
