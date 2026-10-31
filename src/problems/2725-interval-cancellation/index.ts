/**
 * 2725. Interval Cancellation
 *
 * Call `fn(...args)` now and then every `t` milliseconds, and return a
 * function that stops the calls.
 *
 * Call once, then schedule the rest with `setInterval`.
 *
 * @see https://leetcode.com/problems/interval-cancellation/
 * @difficulty Easy
 * @timeComplexity O(1) per call
 * @spaceComplexity O(1)
 *
 * @example
 * const cancel = intervalCancellation(console.log, ["tick"], 35);
 * setTimeout(cancel, 190); // logs at 0, 35, 70, 105, 140 and 175ms
 */
export function intervalCancellation<A extends unknown[]>(
	fn: (...args: A) => unknown,
	args: A,
	t: number,
): () => void {
	fn(...args);
	const timer = setInterval(() => fn(...args), t);
	return () => clearInterval(timer);
}
