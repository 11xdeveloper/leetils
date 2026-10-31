/**
 * 2637. Promise Time Limit
 *
 * Wrap the asynchronous `fn` so its result is used if it settles within `t`
 * milliseconds, and the call rejects with `"Time Limit Exceeded"` otherwise.
 *
 * Race `fn`'s promise against a timer that rejects, clearing the timer once
 * the race is decided.
 *
 * @see https://leetcode.com/problems/promise-time-limit/
 * @difficulty Medium
 * @timeComplexity O(1) on top of `fn`
 * @spaceComplexity O(1)
 *
 * @example
 * const limited = promiseTimeLimit(async (n: number) => n * n, 50);
 * await limited(5); // 25
 */
export function promiseTimeLimit<A extends unknown[], R>(
	fn: (...args: A) => Promise<R>,
	t: number,
): (...args: A) => Promise<R> {
	return (...args) =>
		new Promise<R>((resolve, reject) => {
			const timer = setTimeout(() => reject("Time Limit Exceeded"), t);
			fn(...args)
				.then(resolve, reject)
				.finally(() => clearTimeout(timer));
		});
}
