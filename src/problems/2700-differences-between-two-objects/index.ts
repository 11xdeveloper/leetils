type Json = null | boolean | number | string | readonly Json[] | JsonObject;
type JsonObject = { readonly [key: string]: Json };

/** The differences between two values: changed leaves and nested differences. */
type Diff = { [key: string]: Diff | [Json, Json] };

const isObject = (value: Json): value is JsonObject | readonly Json[] =>
	typeof value === "object" && value !== null;

/**
 * 2700. Differences Between Two Objects
 *
 * The differences between two JSON objects or arrays, for the keys (or
 * indices) they share. A key whose values are both objects, or both arrays,
 * maps to the differences between them, if there are any. Any other key
 * whose values differ maps to `[value1, value2]`.
 *
 * Recurse over the shared keys, keeping non-empty nested differences.
 *
 * @see https://leetcode.com/problems/differences-between-two-objects/
 * @difficulty Medium
 * @timeComplexity O(n), for n values in total
 * @spaceComplexity O(n)
 *
 * @example
 * differencesBetweenTwoObjects({ a: 1, v: 3, x: [] }, { a: 2, v: 4, x: [] });
 * // { a: [1, 2], v: [3, 4] }
 */
export function differencesBetweenTwoObjects(
	obj1: JsonObject | readonly Json[],
	obj2: JsonObject | readonly Json[],
): Diff {
	const a = obj1 as JsonObject;
	const b = obj2 as JsonObject;
	const diff: Diff = {};
	for (const key of Object.keys(a)) {
		if (!Object.hasOwn(b, key)) continue;
		const x = a[key] ?? null;
		const y = b[key] ?? null;
		if (isObject(x) && isObject(y) && Array.isArray(x) === Array.isArray(y)) {
			const nested = differencesBetweenTwoObjects(x, y);
			if (Object.keys(nested).length > 0) diff[key] = nested;
		} else if (x !== y) diff[key] = [x, y];
	}
	return diff;
}
