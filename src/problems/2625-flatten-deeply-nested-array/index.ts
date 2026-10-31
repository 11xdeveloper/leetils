type NestedArray<T> = readonly (T | NestedArray<T>)[];

/**
 * 2625. Flatten Deeply Nested Array
 *
 * Flatten `arr`, but only for subarrays nested less than `n` deep: an array
 * inside the top level has depth 0, one inside that has depth 1, and so on.
 * Same as `arr.flat(n)`.
 *
 * Recurse into a subarray while the remaining depth is positive, pushing
 * everything else onto the result.
 *
 * @see https://leetcode.com/problems/flatten-deeply-nested-array/
 * @difficulty Medium
 * @timeComplexity O(m), for m elements and subarrays in total
 * @spaceComplexity O(m)
 *
 * @example
 * flattenDeeplyNestedArray([1, [2, [3]]], 1); // [1, 2, [3]]
 */
export function flattenDeeplyNestedArray<T>(
	arr: NestedArray<T>,
	n: number,
): (T | NestedArray<T>)[] {
	const result: (T | NestedArray<T>)[] = [];
	const flatten = (items: NestedArray<T>, depth: number): void => {
		for (const item of items)
			if (Array.isArray(item) && depth > 0) flatten(item, depth - 1);
			else result.push(item);
	};
	flatten(arr, n);
	return result;
}
