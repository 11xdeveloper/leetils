/**
 * 1743. Restore the Array From Adjacent Pairs
 *
 * `adjacentPairs` lists every pair of neighbouring elements of an array of
 * distinct values, in any order. Returns the array (either direction).
 *
 * The ends are the values with one neighbour; walk from one end, always
 * stepping to the neighbour not just visited.
 *
 * @see https://leetcode.com/problems/restore-the-array-from-adjacent-pairs/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * restoreTheArrayFromAdjacentPairs([[2, 1], [3, 4], [3, 2]]); // [1, 2, 3, 4]
 */
export const restoreTheArrayFromAdjacentPairs = (
	adjacentPairs: readonly (readonly number[])[],
): number[] => {
	const neighbours = new Map<number, number[]>();
	for (const [a = 0, b = 0] of adjacentPairs) {
		neighbours.set(a, [...(neighbours.get(a) ?? []), b]);
		neighbours.set(b, [...(neighbours.get(b) ?? []), a]);
	}
	let start = 0;
	for (const [value, list] of neighbours) {
		if (list.length === 1) {
			start = value;
			break;
		}
	}
	const result = [start];
	let previous: number | undefined;
	for (let i = 0; i < adjacentPairs.length; i++) {
		const current = result.at(-1) ?? 0;
		const next =
			neighbours.get(current)?.find((value) => value !== previous) ?? 0;
		previous = current;
		result.push(next);
	}
	return result;
};
