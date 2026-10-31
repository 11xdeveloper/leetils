/**
 * 2636. Promise Pool
 *
 * Run the asynchronous `functions` in order with at most `n` running at
 * once, starting the next one as soon as one finishes. The returned promise
 * resolves when they've all finished.
 *
 * Start `n` workers that each keep taking the next function off a shared
 * index until none are left.
 *
 * @see https://leetcode.com/problems/promise-pool/
 * @difficulty Medium
 * @timeComplexity O(f) on top of the functions, for f functions
 * @spaceComplexity O(n)
 *
 * @example
 * await promisePool([() => sleep(300), () => sleep(400), () => sleep(200)], 2);
 * // resolves after 500ms
 */
export async function promisePool(
	functions: readonly (() => Promise<unknown>)[],
	n: number,
): Promise<void> {
	let next = 0;
	const worker = async (): Promise<void> => {
		while (next < functions.length) await functions[next++]?.();
	};
	await Promise.all(
		Array.from({ length: Math.min(n, functions.length) }, worker),
	);
}
