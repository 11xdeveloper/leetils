type Json = null | boolean | number | string | readonly Json[] | JsonObject;
type JsonObject = { readonly [key: string]: Json };

/**
 * 2628. JSON Deep Equal
 *
 * Whether two values parsed from JSON are deeply equal: primitives must be
 * `===`, arrays must have equal elements in the same order, and objects must
 * have the same keys with equal values. An array never equals an object.
 *
 * Recurse, checking that both sides are the same kind of value first.
 *
 * @see https://leetcode.com/problems/json-deep-equal/
 * @difficulty Medium
 * @timeComplexity O(n), for n values in total
 * @spaceComplexity O(d), for nesting depth d
 *
 * @example
 * jsonDeepEqual({ x: 1, y: 2 }, { y: 2, x: 1 }); // true
 * jsonDeepEqual([1, 2], { 0: 1, 1: 2 }); // false
 */
export function jsonDeepEqual(o1: Json, o2: Json): boolean {
	if (o1 === o2) return true;
	if (
		typeof o1 !== "object" ||
		typeof o2 !== "object" ||
		o1 === null ||
		o2 === null ||
		Array.isArray(o1) !== Array.isArray(o2)
	)
		return false;
	const a = o1 as JsonObject;
	const b = o2 as JsonObject;
	const keys = Object.keys(a);
	if (keys.length !== Object.keys(b).length) return false;
	return keys.every(
		(key) =>
			Object.hasOwn(b, key) && jsonDeepEqual(a[key] ?? null, b[key] ?? null),
	);
}
