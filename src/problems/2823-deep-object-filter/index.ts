/**
 * 2823. Deep Object Filter
 *
 * Keep only the primitive values in a nested object or array for which
 * `fn` returns true, then drop any object or array left empty. Returns
 * `undefined` if nothing is left at all.
 *
 * Recurse, rebuilding each container from the parts that survive, and
 * reporting an empty container as `undefined` so its parent drops it.
 *
 * @see https://leetcode.com/problems/deep-object-filter/
 * @difficulty Medium
 * @timeComplexity O(n) calls of `fn`, for n values in total
 * @spaceComplexity O(n)
 *
 * @example
 * deepObjectFilter([-5, -4, -3, -2, -1, 0, 1], (x) => (x as number) > 0); // [1]
 */
export function deepObjectFilter(
	obj: unknown,
	fn: (value: unknown) => boolean,
): unknown {
	if (typeof obj !== "object" || obj === null) return fn(obj) ? obj : undefined;
	if (Array.isArray(obj)) {
		const kept = obj
			.map((value: unknown) => deepObjectFilter(value, fn))
			.filter((value) => value !== undefined);
		return kept.length > 0 ? kept : undefined;
	}
	const kept: Record<string, unknown> = {};
	let empty = true;
	for (const [key, value] of Object.entries(obj)) {
		const filtered = deepObjectFilter(value, fn);
		if (filtered === undefined) continue;
		kept[key] = filtered;
		empty = false;
	}
	return empty ? undefined : kept;
}
