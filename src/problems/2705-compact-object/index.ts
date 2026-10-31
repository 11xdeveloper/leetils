type Json = null | boolean | number | string | readonly Json[] | JsonObject;
type JsonObject = { readonly [key: string]: Json };

/**
 * 2705. Compact Object
 *
 * Remove every falsy value from a JSON object or array, at any depth: falsy
 * array elements are dropped, and so are object keys with falsy values.
 * Empty objects and arrays are truthy, so they stay.
 *
 * Recurse, rebuilding each array and object from its truthy values.
 *
 * @see https://leetcode.com/problems/compact-object/
 * @difficulty Medium
 * @timeComplexity O(n), for n values in total
 * @spaceComplexity O(n)
 *
 * @example
 * compactObject([null, 0, false, 1]); // [1]
 * compactObject({ a: null, b: [false, 1] }); // { b: [1] }
 */
export function compactObject(obj: Json): Json {
	if (typeof obj !== "object" || obj === null) return obj;
	if (Array.isArray(obj)) return obj.filter(Boolean).map(compactObject);
	const result: Record<string, Json> = {};
	for (const [key, value] of Object.entries(obj as JsonObject))
		if (value) result[key] = compactObject(value);
	return result;
}
