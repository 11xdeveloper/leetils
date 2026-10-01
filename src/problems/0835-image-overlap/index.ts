/**
 * 835. Image Overlap
 *
 * Returns the most positions where both `n × n` binary images have a 1,
 * after sliding `img1` by any offset (cells moved off the edge are lost).
 *
 * Every pair of a 1 in `img1` and a 1 in `img2` votes for the offset that
 * would line them up; the most popular offset wins.
 *
 * @see https://leetcode.com/problems/image-overlap/
 * @difficulty Medium
 * @timeComplexity O(a · b) for a and b ones in the two images
 * @spaceComplexity O(n^2)
 *
 * @example
 * imageOverlap([[1, 1, 0], [0, 1, 0], [0, 1, 0]], [[0, 0, 0], [0, 1, 1], [0, 0, 1]]); // 3
 */
export const imageOverlap = (
	img1: readonly (readonly number[])[],
	img2: readonly (readonly number[])[],
): number => {
	const ones = (img: readonly (readonly number[])[]): number[][] =>
		img.flatMap((row, r) =>
			row.flatMap((cell, c) => (cell === 1 ? [[r, c]] : [])),
		);
	const votes = new Map<number, number>();
	let best = 0;
	for (const [r1 = 0, c1 = 0] of ones(img1)) {
		for (const [r2 = 0, c2 = 0] of ones(img2)) {
			const key = (r2 - r1) * 100 + (c2 - c1);
			const count = (votes.get(key) ?? 0) + 1;
			votes.set(key, count);
			best = Math.max(best, count);
		}
	}
	return best;
};
