/**
 * 2857. Count Pairs of Points With Distance k
 *
 * The distance between two points is `(x1 XOR x2) + (y1 XOR y2)`.
 * Returns how many pairs of points are exactly `k` apart.
 *
 * `k` is small: for each split of `k` into `a + (k - a)`, the partner
 * must be at `(x XOR a, y XOR (k - a))`. Look it up among earlier points.
 *
 * @see https://leetcode.com/problems/count-pairs-of-points-with-distance-k/
 * @difficulty Medium
 * @timeComplexity O(n · k)
 * @spaceComplexity O(n)
 *
 * @example
 * countPairsOfPointsWithDistanceK([[1, 2], [4, 2], [1, 3], [5, 2]], 5); // 2
 */
export const countPairsOfPointsWithDistanceK = (
	coordinates: readonly (readonly number[])[],
	k: number,
): number => {
	const seen = new Map<number, number>();
	const key = (x: number, y: number): number => x * 2_000_003 + y;
	let pairs = 0;
	for (const [x = 0, y = 0] of coordinates) {
		for (let a = 0; a <= k; a++)
			pairs += seen.get(key(x ^ a, y ^ (k - a))) ?? 0;
		seen.set(key(x, y), (seen.get(key(x, y)) ?? 0) + 1);
	}
	return pairs;
};
