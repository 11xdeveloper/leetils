/**
 * 3488. Closest Equal Element Queries
 *
 * For each queried index of the circular array `nums`, the circular
 * distance to the nearest other index with the same value, or -1.
 *
 * Group the indices by value; in each sorted group the nearest equal
 * elements are the neighbours, wrapping round the ends of the group.
 *
 * @see https://leetcode.com/problems/closest-equal-element-queries/
 * @difficulty Medium
 * @timeComplexity O(n + q)
 * @spaceComplexity O(n)
 *
 * @example
 * closestEqualElementQueries([1, 3, 1, 4, 1, 3, 2], [0, 3, 5]); // [2, -1, 3]
 */
export const closestEqualElementQueries = (
	nums: readonly number[],
	queries: readonly number[],
): number[] => {
	const n = nums.length;
	const groups = new Map<number, number[]>();
	nums.forEach((num, i) => {
		const group = groups.get(num) ?? [];
		group.push(i);
		groups.set(num, group);
	});
	const nearest = new Int32Array(n).fill(-1);
	for (const group of groups.values()) {
		if (group.length < 2) continue;
		group.forEach((index, j) => {
			const distance = (other: number): number => {
				const gap = Math.abs(other - index);
				return Math.min(gap, n - gap);
			};
			const before = group[(j - 1 + group.length) % group.length] ?? index;
			const after = group[(j + 1) % group.length] ?? index;
			nearest[index] = Math.min(distance(before), distance(after));
		});
	}
	return queries.map((index) => nearest[index] ?? -1);
};
