const MUTATING_METHODS = new Set<PropertyKey>([
	"pop",
	"push",
	"shift",
	"unshift",
	"splice",
	"sort",
	"reverse",
]);

/**
 * 2692. Make Object Immutable
 *
 * Wrap a JSON object so that any attempt to change it, at any depth, throws:
 * `"Error Modifying: key"` for setting or deleting an object's property,
 * `"Error Modifying Index: index"` for an array's element, and
 * `"Error Calling Method: name"` for calling one of the array methods that
 * change it (`pop`, `push`, `shift`, `unshift`, `splice`, `sort` and
 * `reverse`). Reading works as normal.
 *
 * A `Proxy` whose traps throw, wrapping nested objects in proxies as they're
 * read and caching them so each is wrapped once.
 *
 * @see https://leetcode.com/problems/make-object-immutable/
 * @difficulty Medium
 * @timeComplexity O(1) per access
 * @spaceComplexity O(n) for the cached proxies
 *
 * @example
 * const object = makeObjectImmutable({ x: 5 });
 * object.x = 6; // throws "Error Modifying: x"
 */
export function makeObjectImmutable<T extends object>(obj: T): T {
	const proxies = new WeakMap<object, object>();
	const wrap = <U extends object>(target: U): U => {
		const cached = proxies.get(target);
		if (cached) return cached as U;
		const message = (key: PropertyKey): string =>
			Array.isArray(target)
				? `Error Modifying Index: ${String(key)}`
				: `Error Modifying: ${String(key)}`;
		const proxy = new Proxy(target, {
			get: (_, key) => {
				const value: unknown = Reflect.get(target, key);
				if (Array.isArray(target) && MUTATING_METHODS.has(key))
					return () => {
						throw `Error Calling Method: ${String(key)}`;
					};
				return typeof value === "object" && value !== null
					? wrap(value)
					: value;
			},
			set: (_, key) => {
				throw message(key);
			},
			deleteProperty: (_, key) => {
				throw message(key);
			},
		});
		proxies.set(target, proxy);
		return proxy;
	};
	return wrap(obj);
}
