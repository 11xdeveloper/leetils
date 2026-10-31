/**
 * 2776. Convert Callback Based Function to Promise Based Function
 *
 * Promisify `fn`, which takes a callback as its first argument followed by
 * its other arguments, and reports its result as `callback(data, error)`.
 * The returned function takes just the other arguments and returns a
 * promise that rejects with `error` if there is one, or resolves with
 * `data`.
 *
 * Call `fn` inside a promise executor with a callback that settles it.
 *
 * @see https://leetcode.com/problems/convert-callback-based-function-to-promise-based-function/
 * @difficulty Medium
 * @timeComplexity O(1) on top of `fn`
 * @spaceComplexity O(1)
 *
 * @example
 * const sum = convertCallbackBasedFunctionToPromiseBasedFunction(
 *   (callback: (data: number) => void, a: number, b: number) => callback(a + b),
 * );
 * await sum(1, 2); // 3
 */
export function convertCallbackBasedFunctionToPromiseBasedFunction<
	T,
	A extends unknown[],
>(
	fn: (callback: (data: T, error?: unknown) => void, ...args: A) => void,
): (...args: A) => Promise<T> {
	return (...args) =>
		new Promise((resolve, reject) => {
			fn(
				(data, error) => {
					if (error !== undefined) reject(error);
					else resolve(data);
				},
				...args,
			);
		});
}
