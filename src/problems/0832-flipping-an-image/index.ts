/**
 * 832. Flipping an Image
 *
 * Flips each row of the binary `image` horizontally, then inverts every
 * bit, returning a new image.
 *
 * Reverses each row and maps each bit `b` to `1 - b`.
 *
 * @see https://leetcode.com/problems/flipping-an-image/
 * @difficulty Easy
 * @timeComplexity O(n^2)
 * @spaceComplexity O(n^2) for the result
 *
 * @example
 * flippingAnImage([[1, 1, 0], [1, 0, 1], [0, 0, 0]]); // [[1, 0, 0], [0, 1, 0], [1, 1, 1]]
 */
export const flippingAnImage = (
	image: readonly (readonly number[])[],
): number[][] => image.map((row) => row.toReversed().map((bit) => 1 - bit));
