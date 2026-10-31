/**
 * 3767. Maximize Points After Choosing K Tasks
 *
 * Every task is done with technique 1 or technique 2, earning
 * `technique1[i]` or `technique2[i]` points; at least `k` tasks must use
 * technique 1. Returns the most points.
 *
 * Force technique 1 on the k tasks where it compares best, and take the
 * better technique for the rest.
 *
 * @see https://leetcode.com/problems/maximize-points-after-choosing-k-tasks/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * maximizePointsAfterChoosingKTasks([5, 2, 10], [10, 3, 8], 2); // 22
 */
export const maximizePointsAfterChoosingKTasks = (
	technique1: readonly number[],
	technique2: readonly number[],
	k: number,
): number => {
	const order = technique1
		.map((_, i) => i)
		.sort(
			(a, b) =>
				(technique1[b] ?? 0) -
				(technique2[b] ?? 0) -
				((technique1[a] ?? 0) - (technique2[a] ?? 0)),
		);
	return order.reduce(
		(total, i, rank) =>
			total +
			(rank < k
				? (technique1[i] ?? 0)
				: Math.max(technique1[i] ?? 0, technique2[i] ?? 0)),
		0,
	);
};
