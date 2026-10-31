const MOD = 1_000_000_007;

/**
 * 3623. Count Number of Trapezoids I
 *
 * Counts the quadrilaterals with corners in `points` that have a pair of
 * horizontal sides, modulo 1e9+7.
 *
 * Pick two points on each of two different horizontal lines. Sweep the
 * lines, multiplying each line's pairs by the pairs on earlier lines.
 *
 * @see https://leetcode.com/problems/count-number-of-trapezoids-i/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * countNumberOfTrapezoidsI([[1, 0], [2, 0], [3, 0], [2, 2], [3, 2]]); // 3
 */
export const countNumberOfTrapezoidsI = (
	points: readonly (readonly number[])[],
): number => {
	const perLine = new Map<number, number>();
	for (const [, y = 0] of points) perLine.set(y, (perLine.get(y) ?? 0) + 1);
	let count = 0;
	let earlier = 0;
	for (const size of perLine.values()) {
		const pairs = ((size * (size - 1)) / 2) % MOD;
		count = (count + ((pairs * earlier) % MOD)) % MOD;
		earlier = (earlier + pairs) % MOD;
	}
	return count;
};
