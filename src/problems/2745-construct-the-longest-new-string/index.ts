/**
 * 2745. Construct the Longest New String
 *
 * From `x` copies of "AA", `y` of "BB" and `z` of "AB", concatenates some
 * without forming "AAA" or "BBB". Returns the longest length possible.
 *
 * "AA" and "BB" must alternate, allowing one extra of the more plentiful;
 * every "AB" fits in somewhere.
 *
 * @see https://leetcode.com/problems/construct-the-longest-new-string/
 * @difficulty Medium
 * @timeComplexity O(1)
 * @spaceComplexity O(1)
 *
 * @example
 * constructTheLongestNewString(2, 5, 1); // 12
 */
export const constructTheLongestNewString = (
	x: number,
	y: number,
	z: number,
): number => 2 * (2 * Math.min(x, y) + (x === y ? 0 : 1) + z);
