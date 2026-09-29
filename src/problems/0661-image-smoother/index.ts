/**
 * 661. Image Smoother
 *
 * Replaces each cell of the image `img` with the floor of the average of
 * itself and its (up to eight) neighbours, all computed from the original.
 *
 * Averages each cell's 3 × 3 neighbourhood, clipped at the edges.
 *
 * @see https://leetcode.com/problems/image-smoother/
 * @difficulty Easy
 * @timeComplexity O(m · n)
 * @spaceComplexity O(m · n) for the result
 *
 * @example
 * imageSmoother([[100, 200, 100], [200, 50, 200], [100, 200, 100]]); // [[137, 141, 137], [141, 138, 141], [137, 141, 137]]
 */
export const imageSmoother = (
	img: readonly (readonly number[])[],
): number[][] =>
	img.map((row, r) =>
		row.map((_, c) => {
			let sum = 0;
			let count = 0;
			for (let dr = -1; dr <= 1; dr++) {
				for (let dc = -1; dc <= 1; dc++) {
					const value = img[r + dr]?.[c + dc];
					if (value === undefined) continue;
					sum += value;
					count++;
				}
			}
			return Math.floor(sum / count);
		}),
	);
