/**
 * 3796. Find Maximum Value in a Constrained Sequence
 *
 * A sequence of `n` non-negative integers starts at 0, neighbours i and
 * i + 1 differ by at most `diff[i]`, and each restriction `[idx, maxVal]`
 * caps that element. Returns the largest value any element can take.
 *
 * Each element's tightest cap comes from the start and the restrictions,
 * spreading out by the allowed differences; two sweeps, forwards and
 * backwards, compute it, and the caps themselves are achievable.
 *
 * @see https://leetcode.com/problems/find-maximum-value-in-a-constrained-sequence/
 * @difficulty Medium
 * @timeComplexity O(n + r)
 * @spaceComplexity O(n)
 *
 * @example
 * findMaximumValueInAConstrainedSequence(10, [[3, 1], [8, 1]], [2, 2, 3, 1, 4, 5, 1, 1, 2]); // 6
 */
export const findMaximumValueInAConstrainedSequence = (
	n: number,
	restrictions: readonly (readonly number[])[],
	diff: readonly number[],
): number => {
	const cap = new Array<number>(n).fill(Number.POSITIVE_INFINITY);
	cap[0] = 0;
	for (const [index = 0, limit = 0] of restrictions)
		cap[index] = Math.min(cap[index] ?? 0, limit);
	for (let i = 1; i < n; i++)
		cap[i] = Math.min(cap[i] ?? 0, (cap[i - 1] ?? 0) + (diff[i - 1] ?? 0));
	for (let i = n - 2; i >= 0; i--)
		cap[i] = Math.min(cap[i] ?? 0, (cap[i + 1] ?? 0) + (diff[i] ?? 0));
	return Math.max(...cap);
};
