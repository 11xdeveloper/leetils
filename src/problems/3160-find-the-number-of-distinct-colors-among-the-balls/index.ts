/**
 * 3160. Find the Number of Distinct Colors Among the Balls
 *
 * Each query `[ball, color]` paints a ball (repainting it if needed).
 * Returns how many distinct colors are in use after each query.
 *
 * Track each ball's color and how many balls have each color.
 *
 * @see https://leetcode.com/problems/find-the-number-of-distinct-colors-among-the-balls/
 * @difficulty Medium
 * @timeComplexity O(q)
 * @spaceComplexity O(q)
 *
 * @example
 * findTheNumberOfDistinctColorsAmongTheBalls(4, [[1, 4], [2, 5], [1, 3], [3, 4]]); // [1, 2, 2, 3]
 */
export const findTheNumberOfDistinctColorsAmongTheBalls = (
	_limit: number,
	queries: readonly (readonly number[])[],
): number[] => {
	const ballColor = new Map<number, number>();
	const colorBalls = new Map<number, number>();
	return queries.map(([ball = 0, color = 0]) => {
		const old = ballColor.get(ball);
		if (old !== undefined) {
			const left = (colorBalls.get(old) ?? 0) - 1;
			if (left === 0) colorBalls.delete(old);
			else colorBalls.set(old, left);
		}
		ballColor.set(ball, color);
		colorBalls.set(color, (colorBalls.get(color) ?? 0) + 1);
		return colorBalls.size;
	});
};
