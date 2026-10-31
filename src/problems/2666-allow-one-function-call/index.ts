/**
 * 2666. Allow One Function Call
 *
 * Wrap `fn` so only the first call runs it, returning its result. Later
 * calls return `undefined`.
 *
 * Flip a flag on the first call.
 *
 * @see https://leetcode.com/problems/allow-one-function-call/
 * @difficulty Easy
 * @timeComplexity O(1) per call on top of `fn`
 * @spaceComplexity O(1)
 *
 * @example
 * const once = allowOneFunctionCall((a: number, b: number) => a + b);
 * once(1, 2); // 3
 * once(2, 3); // undefined
 */
export function allowOneFunctionCall<A extends unknown[], R>(
	fn: (...args: A) => R,
): (...args: A) => R | undefined {
	let called = false;
	return (...args) => {
		if (called) return undefined;
		called = true;
		return fn(...args);
	};
}
