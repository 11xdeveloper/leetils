/**
 * 2715. Timeout Cancellation
 *
 * Call `fn(...args)` after `t` milliseconds, and return a function that
 * cancels the call if it hasn't happened yet.
 *
 * Schedule the call with `setTimeout` and cancel with `clearTimeout`.
 *
 * @see https://leetcode.com/problems/timeout-cancellation/
 * @difficulty Easy
 * @timeComplexity O(1)
 * @spaceComplexity O(1)
 *
 * @example
 * const cancel = timeoutCancellation(console.log, ["hi"], 20);
 * setTimeout(cancel, 50); // "hi" is logged after 20ms, before the cancel
 */
export function timeoutCancellation<A extends unknown[]>(
	fn: (...args: A) => unknown,
	args: A,
	t: number,
): () => void {
	const timer = setTimeout(() => fn(...args), t);
	return () => clearTimeout(timer);
}
