/**
 * 2821. Delay the Resolution of Each Promise
 *
 * Wrap each asynchronous function so its promise settles `ms` milliseconds
 * after the original would have, resolving or rejecting the same way.
 *
 * Wait for the original promise, then settle after a timeout.
 *
 * @see https://leetcode.com/problems/delay-the-resolution-of-each-promise/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * const [delayed] = delayTheResolutionOfEachPromise([() => sleep(30)], 50);
 * await delayed?.(); // resolves after 80ms
 */
export function delayTheResolutionOfEachPromise<T>(
	functions: readonly (() => Promise<T>)[],
	ms: number,
): (() => Promise<T>)[] {
	const wait = () => new Promise((resolve) => setTimeout(resolve, ms));
	return functions.map(
		(fn) => () =>
			fn().then(
				async (value) => {
					await wait();
					return value;
				},
				async (reason: unknown) => {
					await wait();
					throw reason;
				},
			),
	);
}
