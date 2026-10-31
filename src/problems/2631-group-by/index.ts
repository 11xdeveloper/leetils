/**
 * 2631. Group By
 *
 * `Array.prototype.groupBy(fn)`: group the array's elements into an object
 * keyed by `fn(element)`, keeping each group in the original order. Install
 * it with `Array.prototype.groupBy = groupBy`, or call it with
 * `groupBy.call(array, fn)`.
 *
 * Append each element to the list for its key, creating lists as needed.
 *
 * @see https://leetcode.com/problems/group-by/
 * @difficulty Medium
 * @timeComplexity O(n) on top of `fn`
 * @spaceComplexity O(n)
 *
 * @example
 * groupBy.call([1, 2, 3], String); // { 1: [1], 2: [2], 3: [3] }
 */
export function groupBy<T>(
	this: readonly T[],
	fn: (item: T) => string,
): Record<string, T[]> {
	const groups: Record<string, T[]> = {};
	for (const item of this) {
		const key = fn(item);
		const group = groups[key];
		if (group) group.push(item);
		else groups[key] = [item];
	}
	return groups;
}
