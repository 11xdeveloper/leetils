/**
 * 1029. Two City Scheduling
 *
 * `2n` people each have a cost to fly to city A and to city B. Returns the
 * least total cost sending exactly `n` people to each city.
 *
 * Sorting by how much cheaper A is than B, the first half go to A and the
 * rest to B.
 *
 * @see https://leetcode.com/problems/two-city-scheduling/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * twoCityScheduling([[10, 20], [30, 200], [400, 50], [30, 20]]); // 110
 */
export const twoCityScheduling = (
	costs: readonly (readonly number[])[],
): number => {
	const sorted = costs.toSorted(
		(a, b) => (a[0] ?? 0) - (a[1] ?? 0) - ((b[0] ?? 0) - (b[1] ?? 0)),
	);
	const half = sorted.length / 2;
	return sorted.reduce(
		(total, [a = 0, b = 0], i) => total + (i < half ? a : b),
		0,
	);
};
