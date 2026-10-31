/**
 * 2766. Relocate Marbles
 *
 * Marbles sit at the positions in `nums`. Step `i` moves every marble at
 * `moveFrom[i]` to `moveTo[i]`. Returns the occupied positions, sorted.
 *
 * Track the set of occupied positions.
 *
 * @see https://leetcode.com/problems/relocate-marbles/
 * @difficulty Medium
 * @timeComplexity O(n log n + m)
 * @spaceComplexity O(n)
 *
 * @example
 * relocateMarbles([1, 6, 7, 8], [1, 7, 2], [2, 9, 5]); // [5, 6, 8, 9]
 */
export const relocateMarbles = (
	nums: readonly number[],
	moveFrom: readonly number[],
	moveTo: readonly number[],
): number[] => {
	const occupied = new Set(nums);
	for (const [i, from] of moveFrom.entries()) {
		occupied.delete(from);
		occupied.add(moveTo[i] ?? 0);
	}
	return [...occupied].sort((a, b) => a - b);
};
