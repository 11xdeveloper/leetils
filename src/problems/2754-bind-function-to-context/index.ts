/**
 * 2754. Bind Function to Context
 *
 * `Function.prototype.bindPolyfill(obj)`: a version of the function that
 * always runs with `this` set to `obj`, without `Function.prototype.bind`.
 * Install it with `Function.prototype.bindPolyfill =
 * bindFunctionToContext`, or call it with
 * `Reflect.apply(bindFunctionToContext, fn, [obj])`.
 *
 * Return a function that applies the original with `obj` as `this`.
 *
 * @see https://leetcode.com/problems/bind-function-to-context/
 * @difficulty Medium
 * @timeComplexity O(1) per call on top of the function
 * @spaceComplexity O(1)
 *
 * @example
 * function role(this: { role: string }) {
 *   return `My role is ${this.role}`;
 * }
 * Reflect.apply(bindFunctionToContext, role, [{ role: "admin" }])(); // "My role is admin"
 */
export function bindFunctionToContext(
	this: (...args: never[]) => unknown,
	obj: object,
): (...args: unknown[]) => unknown {
	return (...args) => Reflect.apply(this, obj, args);
}
