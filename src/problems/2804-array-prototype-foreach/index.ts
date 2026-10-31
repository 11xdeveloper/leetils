/**
 * 2804. Array Prototype ForEach
 *
 * `Array.prototype.forEach(callback, context)`, without the built-in one:
 * call `callback(element, index, array)` with `this` set to `context` for
 * each element. Install it with `Array.prototype.forEach =
 * arrayPrototypeForeach`, or call it with
 * `arrayPrototypeForeach.call(array, callback, context)`.
 *
 * Loop over the indices, applying the callback to each element.
 *
 * @see https://leetcode.com/problems/array-prototype-foreach/
 * @difficulty Easy
 * @timeComplexity O(n) calls of `callback`
 * @spaceComplexity O(1)
 *
 * @example
 * const doubled = [1, 2, 3];
 * arrayPrototypeForeach.call(doubled, (x, i, arr) => {
 *   arr[i] = x * 2;
 * }, {}); // doubled is [2, 4, 6]
 */
export function arrayPrototypeForeach<T>(
	this: T[],
	callback: (element: T, index: number, array: T[]) => void,
	context?: unknown,
): void {
	for (let i = 0; i < this.length; i++)
		Reflect.apply(callback, context, [this[i], i, this]);
}
