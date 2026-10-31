type MultidimensionalArray = readonly (number | MultidimensionalArray)[];

/**
 * 2649. Nested Array Generator
 *
 * A generator that yields the numbers in a nested array in order, as if it
 * had been flattened completely.
 *
 * Recurse into subarrays with `yield*`.
 *
 * @see https://leetcode.com/problems/nested-array-generator/
 * @difficulty Medium
 * @timeComplexity O(1) amortised per value, O(m) in total for m elements and subarrays
 * @spaceComplexity O(d), for nesting depth d
 *
 * @example
 * [...nestedArrayGenerator([[[6]], [1, 3], []])]; // [6, 1, 3]
 */
export function* nestedArrayGenerator(
	arr: MultidimensionalArray,
): Generator<number, void, unknown> {
	for (const item of arr)
		if (typeof item === "number") yield item;
		else yield* nestedArrayGenerator(item);
}
