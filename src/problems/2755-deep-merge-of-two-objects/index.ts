type Json = null | boolean | number | string | readonly Json[] | JsonObject;
type JsonObject = { readonly [key: string]: Json };

const isObject = (value: Json): value is JsonObject | readonly Json[] =>
	typeof value === "object" && value !== null;

/**
 * 2755. Deep Merge of Two Objects
 *
 * Deep merge two JSON values. Two objects, or two arrays, merge key by key
 * (index by index for arrays), merging the values of shared keys. In every
 * other case `obj2` wins.
 *
 * Recurse into shared keys when both sides are the same kind of container.
 *
 * @see https://leetcode.com/problems/deep-merge-of-two-objects/
 * @difficulty Medium
 * @timeComplexity O(n), for n values in total
 * @spaceComplexity O(n)
 *
 * @example
 * deepMergeOfTwoObjects({ a: 1, c: 3 }, { a: 2, b: 2 }); // { a: 2, c: 3, b: 2 }
 * deepMergeOfTwoObjects([{}, 2, 3], [[], 5]); // [[], 5, 3]
 */
export function deepMergeOfTwoObjects(obj1: Json, obj2: Json): Json {
	if (
		!isObject(obj1) ||
		!isObject(obj2) ||
		Array.isArray(obj1) !== Array.isArray(obj2)
	)
		return obj2;
	const result = (Array.isArray(obj1) ? [...obj1] : { ...obj1 }) as Record<
		string,
		Json
	>;
	for (const [key, value] of Object.entries(obj2))
		result[key] = Object.hasOwn(result, key)
			? deepMergeOfTwoObjects(result[key] ?? null, value)
			: value;
	return result as Json;
}
