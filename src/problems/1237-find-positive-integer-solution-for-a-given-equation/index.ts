/** The interface LeetCode provides: a hidden function increasing in each argument. */
interface CustomFunction {
	f(x: number, y: number): number;
}

/**
 * 1237. Find Positive Integer Solution for a Given Equation
 *
 * `customfunction.f` is increasing in both arguments. Returns every pair of
 * integers `1 ≤ x, y ≤ 1000` with `f(x, y) = z`, by increasing `x`.
 *
 * Two pointers along the staircase: start at `x = 1, y = 1000`; if `f` is
 * too big, decrease `y`, if too small, increase `x`, and on a match record
 * it and move both.
 *
 * @see https://leetcode.com/problems/find-positive-integer-solution-for-a-given-equation/
 * @difficulty Medium
 * @timeComplexity O(1000) calls to f
 * @spaceComplexity O(1), excluding the result
 *
 * @example
 * findPositiveIntegerSolutionForAGivenEquation({ f: (x, y) => x + y }, 5); // [[1, 4], [2, 3], [3, 2], [4, 1]]
 */
export const findPositiveIntegerSolutionForAGivenEquation = (
	customfunction: CustomFunction,
	z: number,
): number[][] => {
	const pairs: number[][] = [];
	for (let [x, y] = [1, 1000]; x <= 1000 && y >= 1; ) {
		const value = customfunction.f(x, y);
		if (value === z) {
			pairs.push([x, y]);
			x++;
			y--;
		} else if (value < z) {
			x++;
		} else {
			y--;
		}
	}
	return pairs;
};
