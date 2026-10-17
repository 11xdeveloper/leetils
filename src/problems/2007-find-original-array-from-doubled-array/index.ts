/**
 * 2007. Find Original Array From Doubled Array
 *
 * `changed` is an array with every element's double appended, then
 * shuffled. Returns the original array, or `[]` if there isn't one.
 *
 * Sort, then pair each smallest unpaired value with its double.
 *
 * @see https://leetcode.com/problems/find-original-array-from-doubled-array/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * findOriginalArrayFromDoubledArray([1, 3, 4, 2, 6, 8]); // [1, 3, 4]
 */
export const findOriginalArrayFromDoubledArray = (
	changed: readonly number[],
): number[] => {
	if (changed.length % 2) return [];
	const unpaired = new Map<number, number>();
	for (const value of changed)
		unpaired.set(value, (unpaired.get(value) ?? 0) + 1);
	const original: number[] = [];
	for (const value of changed.toSorted((a, b) => a - b)) {
		const count = unpaired.get(value) ?? 0;
		if (count === 0) continue;
		unpaired.set(value, count - 1);
		const doubles = unpaired.get(2 * value) ?? 0;
		if (doubles === 0) return [];
		unpaired.set(2 * value, doubles - 1);
		original.push(value);
	}
	return original;
};
