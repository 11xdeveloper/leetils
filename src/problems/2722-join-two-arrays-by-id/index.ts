type Item = { readonly id: number; readonly [key: string]: unknown };

/**
 * 2722. Join Two Arrays by ID
 *
 * Join two arrays of objects with unique `id`s into one sorted by `id`. An
 * `id` in only one array keeps its object as it is; an `id` in both gets
 * the two objects merged, with `arr2`'s values winning.
 *
 * Merge the objects into a map keyed by `id`, then sort its values.
 *
 * @see https://leetcode.com/problems/join-two-arrays-by-id/
 * @difficulty Medium
 * @timeComplexity O(n log n), for n objects in total
 * @spaceComplexity O(n)
 *
 * @example
 * joinTwoArraysById([{ id: 2, x: 1 }], [{ id: 2, y: 2 }, { id: 1 }]);
 * // [{ id: 1 }, { id: 2, x: 1, y: 2 }]
 */
export function joinTwoArraysById(
	arr1: readonly Item[],
	arr2: readonly Item[],
): Item[] {
	const byId = new Map<number, Item>();
	for (const item of [...arr1, ...arr2])
		byId.set(item.id, { ...byId.get(item.id), ...item });
	return [...byId.values()].sort((a, b) => a.id - b.id);
}
