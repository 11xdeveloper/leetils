/**
 * 2623. Memoize
 *
 * Wrap `fn` so it's only called once for each list of arguments, returning
 * the cached result on later calls. Arguments are numbers.
 *
 * Cache results in a map keyed by the arguments joined with commas.
 *
 * @see https://leetcode.com/problems/memoize/
 * @difficulty Medium
 * @timeComplexity O(k) per call on top of `fn`, for k arguments
 * @spaceComplexity O(c · k) for c distinct calls
 *
 * @example
 * const add = memoize((a: number, b: number) => a + b);
 * add(2, 3); // 5, calls fn
 * add(2, 3); // 5, from the cache
 */
export function memoize<R>(
	fn: (...args: number[]) => R,
): (...args: number[]) => R {
	const cache = new Map<string, R>();
	return (...args) => {
		const key = args.join(",");
		if (cache.has(key)) return cache.get(key) as R;
		const result = fn(...args);
		cache.set(key, result);
		return result;
	};
}
