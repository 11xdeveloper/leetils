/**
 * 2833. Furthest Point From Origin
 *
 * Each move is `L`, `R` or `_`, which may go either way. Returns the
 * furthest from the origin you can end.
 *
 * Send every free move the way the fixed moves already lean.
 *
 * @see https://leetcode.com/problems/furthest-point-from-origin/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * furthestPointFromOrigin("_R__LL_"); // 5
 */
export const furthestPointFromOrigin = (moves: string): number => {
	let balance = 0;
	let free = 0;
	for (const move of moves) {
		if (move === "L") balance--;
		else if (move === "R") balance++;
		else free++;
	}
	return Math.abs(balance) + free;
};
