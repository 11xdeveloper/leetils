/**
 * 3963. Create Grid With Exactly One Path
 *
 * Builds an m × n grid of free cells and obstacles with exactly one path
 * from the top-left to the bottom-right moving right or down.
 *
 * Leave the top row and the right column free and block everything else.
 *
 * @see https://leetcode.com/problems/create-grid-with-exactly-one-path/
 * @difficulty Easy
 * @timeComplexity O(m · n)
 * @spaceComplexity O(m · n)
 *
 * @example
 * createGridWithExactlyOnePath(2, 3); // ["...", "##."]
 */
export const createGridWithExactlyOnePath = (m: number, n: number): string[] =>
	Array.from({ length: m }, (_, r) =>
		r === 0 ? ".".repeat(n) : `${"#".repeat(n - 1)}.`,
	);
