/**
 * 2822. Inversion of Object
 *
 * Swap the keys and values of an object (or array, whose indices are its
 * keys). Values become keys as strings; a value shared by several keys maps
 * to an array of them in order.
 *
 * Insert each key under its value, turning an entry into an array when a
 * second key arrives.
 *
 * @see https://leetcode.com/problems/inversion-of-object/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * inversionOfObject({ a: "1", b: "2", c: "2" }); // { 1: "a", 2: ["b", "c"] }
 */
export function inversionOfObject(
	obj: Readonly<Record<string, unknown>> | readonly unknown[],
): Record<string, string | string[]> {
	const result: Record<string, string | string[]> = {};
	for (const [key, value] of Object.entries(obj)) {
		const name = String(value);
		const existing = result[name];
		if (existing === undefined) result[name] = key;
		else if (Array.isArray(existing)) existing.push(key);
		else result[name] = [existing, key];
	}
	return result;
}
