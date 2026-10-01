/**
 * 1954. Minimum Garden Perimeter to Collect Enough Apples
 *
 * The tree at `(i, j)` has `|i| + |j|` apples. Returns the perimeter of the
 * smallest axis-aligned square centred at the origin holding at least
 * `neededApples`.
 *
 * A square of half-side `n` holds `2n(n + 1)(2n + 1)` apples; find the
 * smallest `n` with enough.
 *
 * @see https://leetcode.com/problems/minimum-garden-perimeter-to-collect-enough-apples/
 * @difficulty Medium
 * @timeComplexity O(∛neededApples)
 * @spaceComplexity O(1)
 *
 * @example
 * minimumGardenPerimeterToCollectEnoughApples(13); // 16
 */
export const minimumGardenPerimeterToCollectEnoughApples = (
	neededApples: number,
): number => {
	let n = 1;
	while (2 * n * (n + 1) * (2 * n + 1) < neededApples) n++;
	return 8 * n;
};
