/**
 * 2775. Undefined to Null
 *
 * Replace every `undefined` in an object or array, at any depth, with
 * `null`, so it survives `JSON.stringify`.
 *
 * Recurse, rebuilding each array and object.
 *
 * @see https://leetcode.com/problems/undefined-to-null/
 * @difficulty Medium
 * @timeComplexity O(n), for n values in total
 * @spaceComplexity O(n)
 *
 * @example
 * undefinedToNull({ a: undefined, b: [1, undefined] }); // { a: null, b: [1, null] }
 */
export function undefinedToNull(obj: unknown): unknown {
	if (obj === undefined) return null;
	if (typeof obj !== "object" || obj === null) return obj;
	if (Array.isArray(obj)) return Array.from(obj, undefinedToNull);
	return Object.fromEntries(
		Object.entries(obj).map(([key, value]) => [key, undefinedToNull(value)]),
	);
}
