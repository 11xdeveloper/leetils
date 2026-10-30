/**
 * 2315. Count Asterisks
 *
 * Counts the `*` characters outside the pairs of bars `|...|` in `s`.
 *
 * Splitting on bars leaves the outside parts at even positions.
 *
 * @see https://leetcode.com/problems/count-asterisks/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * countAsterisks("l|*e*et|c**o|*de|"); // 2
 */
export const countAsterisks = (s: string): number =>
	s
		.split("|")
		.filter((_, i) => i % 2 === 0)
		.reduce((count, part) => count + part.split("*").length - 1, 0);
