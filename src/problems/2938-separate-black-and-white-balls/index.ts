/**
 * 2938. Separate Black and White Balls
 *
 * Each step swaps two adjacent balls. Returns the fewest steps to move
 * every white ball (0) left of every black ball (1).
 *
 * Each white ball must pass every black ball before it.
 *
 * @see https://leetcode.com/problems/separate-black-and-white-balls/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * separateBlackAndWhiteBalls("100"); // 2
 */
export const separateBlackAndWhiteBalls = (s: string): number => {
	let black = 0;
	let steps = 0;
	for (const ball of s) {
		if (ball === "1") black++;
		else steps += black;
	}
	return steps;
};
