/**
 * 2794. Create Object from Two Arrays
 *
 * An object mapping each `keysArr[i]`, converted to a string, to
 * `valuesArr[i]`. If a key repeats, its first value is kept.
 *
 * Add the pairs in order, skipping keys that are already set.
 *
 * @see https://leetcode.com/problems/create-object-from-two-arrays/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * createObjectFromTwoArrays(["a", "b", "a"], [1, 2, 3]); // { a: 1, b: 2 }
 */
export function createObjectFromTwoArrays(
	keysArr: readonly unknown[],
	valuesArr: readonly unknown[],
): Record<string, unknown> {
	const result: Record<string, unknown> = {};
	keysArr.forEach((key, i) => {
		const name = String(key);
		if (!Object.hasOwn(result, name)) result[name] = valuesArr[i];
	});
	return result;
}
