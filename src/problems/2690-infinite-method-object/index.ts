/**
 * 2690. Infinite Method Object
 *
 * An object with every method you could name, each of which returns its own
 * name: `object.abc123()` returns `"abc123"`.
 *
 * Use a `Proxy` whose `get` trap makes the method on demand.
 *
 * @see https://leetcode.com/problems/infinite-method-object/
 * @difficulty Easy
 * @timeComplexity O(1) per method
 * @spaceComplexity O(1)
 *
 * @example
 * infiniteMethodObject().abc123(); // "abc123"
 */
export function infiniteMethodObject(): Record<string, () => string> {
	return new Proxy({}, { get: (_, name) => () => String(name) });
}
