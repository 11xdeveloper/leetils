/**
 * 1183. Maximum Number of Ones
 *
 * Returns the most 1s a `width × height` binary matrix can hold when every
 * `sideLength × sideLength` square in it has at most `maxOnes` 1s.
 *
 * Tile the matrix with copies of the top-left square: cells in the same
 * position within their tile belong together. Every full square holds each
 * position exactly once, so filling the `maxOnes` positions that occur most
 * often across the matrix is both allowed and the best possible.
 *
 * @see https://leetcode.com/problems/maximum-number-of-ones/
 * @difficulty Hard
 * @timeComplexity O(s^2 log s) for s = sideLength
 * @spaceComplexity O(s^2)
 *
 * @example
 * maximumNumberOfOnes(3, 3, 2, 1); // 4
 */
export const maximumNumberOfOnes = (
	width: number,
	height: number,
	sideLength: number,
	maxOnes: number,
): number => {
	const occurrences: number[] = [];
	for (let x = 0; x < sideLength; x++) {
		for (let y = 0; y < sideLength; y++) {
			const across = Math.floor((width - x - 1) / sideLength) + 1;
			const down = Math.floor((height - y - 1) / sideLength) + 1;
			occurrences.push(across * down);
		}
	}
	return occurrences
		.sort((a, b) => b - a)
		.slice(0, maxOnes)
		.reduce((sum, count) => sum + count, 0);
};
