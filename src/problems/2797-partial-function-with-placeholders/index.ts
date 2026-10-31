/**
 * 2797. Partial Function with Placeholders
 *
 * Partially apply `fn` with `args`, where `"_"` marks a placeholder. The
 * returned function fills the placeholders with its own arguments in order,
 * appends any left over, and calls `fn`.
 *
 * Walk `args`, taking the next new argument for each placeholder.
 *
 * @see https://leetcode.com/problems/partial-function-with-placeholders/
 * @difficulty Easy
 * @timeComplexity O(a + r) per call, for a partial and r new arguments
 * @spaceComplexity O(a + r)
 *
 * @example
 * partialFunctionWithPlaceholders((...xs: number[]) => xs, [1, "_", 3])(2, 4); // [1, 2, 3, 4]
 */
export function partialFunctionWithPlaceholders<R>(
	fn: (...args: never[]) => R,
	args: readonly unknown[],
): (...restArgs: unknown[]) => R {
	return (...restArgs) => {
		let next = 0;
		const filled = args.map((arg) =>
			arg === "_" && next < restArgs.length ? restArgs[next++] : arg,
		);
		return (fn as (...args: unknown[]) => R)(
			...filled,
			...restArgs.slice(next),
		);
	};
}
