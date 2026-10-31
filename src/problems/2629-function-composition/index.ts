/**
 * 2629. Function Composition
 *
 * Compose `functions` into one function: `[f, g, h]` becomes
 * `x => f(g(h(x)))`. An empty list gives the identity function.
 *
 * Apply the functions from last to first.
 *
 * @see https://leetcode.com/problems/function-composition/
 * @difficulty Easy
 * @timeComplexity O(n) per call
 * @spaceComplexity O(1)
 *
 * @example
 * functionComposition([(x) => x + 1, (x) => 2 * x])(4); // 9
 */
export function functionComposition(
	functions: readonly ((x: number) => number)[],
): (x: number) => number {
	return (x) => functions.reduceRight((value, fn) => fn(value), x);
}
