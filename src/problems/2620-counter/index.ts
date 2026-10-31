/**
 * 2620. Counter
 *
 * A counter that returns `n` the first time it's called, then one more on
 * each later call.
 *
 * Close over the next value to return.
 *
 * @see https://leetcode.com/problems/counter/
 * @difficulty Easy
 * @timeComplexity O(1) per call
 * @spaceComplexity O(1)
 *
 * @example
 * const next = counter(10);
 * next(); // 10
 * next(); // 11
 */
export function counter(n: number): () => number {
	let next = n;
	return () => next++;
}
