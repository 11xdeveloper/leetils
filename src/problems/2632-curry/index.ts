/**
 * 2632. Curry
 *
 * Curry `fn`: the result takes `fn`'s arguments in any number of calls,
 * collecting them until there are `fn.length` of them, then returns `fn`'s
 * result. So `curry(sum)(1)(2)(3)`, `curry(sum)(1, 2)(3)` and
 * `curry(sum)()(1, 2, 3)` all give `sum(1, 2, 3)`.
 *
 * Each call returns a new function that remembers the arguments so far, so
 * partial applications can be reused.
 *
 * @see https://leetcode.com/problems/curry/
 * @difficulty Medium
 * @timeComplexity O(k) per call, for k arguments collected so far
 * @spaceComplexity O(k)
 *
 * @example
 * const add = curry((a: number, b: number) => a + b);
 * add(1)(2); // 3
 */
export function curry(
	fn: (...args: never[]) => unknown,
): (...args: unknown[]) => unknown {
	const collect =
		(collected: readonly unknown[]) =>
		(...args: unknown[]): unknown => {
			const all = [...collected, ...args];
			return all.length >= fn.length
				? (fn as (...args: unknown[]) => unknown)(...all)
				: collect(all);
		};
	return collect([]);
}
