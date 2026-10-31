const RESULT = Symbol("result");

interface Trie {
	readonly children: Map<unknown, Trie>;
	[RESULT]?: { value: unknown };
}

/**
 * 2630. Memoize II
 *
 * Wrap `fn` so it's only called once for each list of arguments, where
 * arguments can be any values and match only if they're `===` (so two
 * different objects with the same contents are different arguments).
 *
 * Store results in a trie with one level per argument, using `Map`s so
 * objects are matched by identity. The node after the last argument holds
 * the cached result.
 *
 * @see https://leetcode.com/problems/memoize-ii/
 * @difficulty Hard
 * @timeComplexity O(k) per call on top of `fn`, for k arguments
 * @spaceComplexity O(c · k) for c distinct calls
 *
 * @example
 * const keys = memoizeII((a: object) => Object.keys(a));
 * const o = {};
 * keys(o) === keys(o); // true
 * keys(o) === keys({}); // false
 */
export function memoizeII<A extends unknown[], R>(
	fn: (...args: A) => R,
): (...args: A) => R {
	const root: Trie = { children: new Map() };
	return (...args) => {
		let node = root;
		for (const arg of args) {
			let child = node.children.get(arg);
			if (!child) {
				child = { children: new Map() };
				node.children.set(arg, child);
			}
			node = child;
		}
		const cached = node[RESULT];
		if (cached) return cached.value as R;
		const value = fn(...args);
		node[RESULT] = { value };
		return value;
	};
}
