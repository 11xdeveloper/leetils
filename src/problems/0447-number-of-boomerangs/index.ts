/**
 * 447. Number of Boomerangs
 *
 * Counts the boomerangs among distinct points: ordered triples `(i, j, k)`
 * where `j` and `k` are the same distance from `i`.
 *
 * For each point `i`, groups the other points by their squared distance
 * from it. A group of `m` points gives `m · (m - 1)` ordered pairs.
 *
 * @see https://leetcode.com/problems/number-of-boomerangs/
 * @difficulty Medium
 * @timeComplexity O(n^2)
 * @spaceComplexity O(n)
 *
 * @example
 * numberOfBoomerangs([[0, 0], [1, 0], [2, 0]]); // 2
 */
export const numberOfBoomerangs = (
	points: readonly (readonly number[])[],
): number => {
	let boomerangs = 0;

	for (const [x1 = 0, y1 = 0] of points) {
		const byDistance = new Map<number, number>();
		for (const [x2 = 0, y2 = 0] of points) {
			const distance = (x1 - x2) ** 2 + (y1 - y2) ** 2;
			const count = byDistance.get(distance) ?? 0;
			boomerangs += 2 * count;
			byDistance.set(distance, count + 1);
		}
	}

	return boomerangs;
};
