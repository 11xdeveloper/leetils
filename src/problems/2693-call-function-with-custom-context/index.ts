/**
 * 2693. Call Function with Custom Context
 *
 * `Function.prototype.callPolyfill(context, ...args)`: call the function
 * with `this` set to `context`, without `Function.prototype.call`. Install
 * it with `Function.prototype.callPolyfill = callFunctionWithCustomContext`,
 * or use `Reflect.apply(callFunctionWithCustomContext, fn, [context,
 * ...args])`.
 *
 * Attach the function to `context` under a fresh symbol, call it as a
 * method, then remove it again.
 *
 * @see https://leetcode.com/problems/call-function-with-custom-context/
 * @difficulty Medium
 * @timeComplexity O(1) on top of the function
 * @spaceComplexity O(1)
 *
 * @example
 * function increment(this: { count: number }) {
 *   return ++this.count;
 * }
 * Reflect.apply(callFunctionWithCustomContext, increment, [{ count: 1 }]); // 2
 */
export function callFunctionWithCustomContext(
	this: (...args: never[]) => unknown,
	context: object,
	...args: unknown[]
): unknown {
	const key = Symbol("callPolyfill");
	Object.defineProperty(context, key, { value: this, configurable: true });
	try {
		return (context as Record<symbol, (...args: unknown[]) => unknown>)[key]?.(
			...args,
		);
	} finally {
		Reflect.deleteProperty(context, key);
	}
}
