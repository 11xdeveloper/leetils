/**
 * 2001. Number of Pairs of Interchangeable Rectangles
 *
 * Counts the pairs of rectangles with the same width-to-height ratio.
 *
 * Reduce each ratio by the greatest common divisor so equal ratios get the
 * same key, and count the earlier rectangles with each key.
 *
 * @see https://leetcode.com/problems/number-of-pairs-of-interchangeable-rectangles/
 * @difficulty Medium
 * @timeComplexity O(n log m) for sides up to m
 * @spaceComplexity O(n)
 *
 * @example
 * numberOfPairsOfInterchangeableRectangles([[4, 8], [3, 6], [10, 20], [15, 30]]); // 6
 */
export const numberOfPairsOfInterchangeableRectangles = (
	rectangles: readonly (readonly number[])[],
): number => {
	const gcd = (a: number, b: number): number => {
		while (b) [a, b] = [b, a % b];
		return a;
	};
	const seen = new Map<string, number>();
	let pairs = 0;
	for (const [width = 1, height = 1] of rectangles) {
		const divisor = gcd(width, height);
		const key = `${width / divisor}/${height / divisor}`;
		const count = seen.get(key) ?? 0;
		pairs += count;
		seen.set(key, count + 1);
	}
	return pairs;
};
