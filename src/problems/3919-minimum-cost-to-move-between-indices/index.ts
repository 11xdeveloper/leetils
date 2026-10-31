/**
 * 3919. Minimum Cost to Move Between Indices
 *
 * `nums` strictly increases. From index x you can jump anywhere for the
 * value difference, or to x's closest neighbour (by value, the left one
 * on ties) for 1. For each query `[l, r]`, returns the cheapest trip.
 *
 * A jump costs exactly the neighbour steps it passes, and a neighbour
 * step never costs more than its difference, so walk neighbour by
 * neighbour. Prefix sums of rightward and leftward step costs answer
 * each query.
 *
 * @see https://leetcode.com/problems/minimum-cost-to-move-between-indices/
 * @difficulty Medium
 * @timeComplexity O(n + q)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumCostToMoveBetweenIndices([-5, -2, 3], [[0, 2], [2, 0], [1, 2]]); // [6, 2, 5]
 */
export const minimumCostToMoveBetweenIndices = (
	nums: readonly number[],
	queries: readonly (readonly number[])[],
): number[] => {
	const n = nums.length;
	const closest = (x: number): number => {
		if (x === 0) return 1;
		if (x === n - 1) return n - 2;
		return (nums[x] ?? 0) - (nums[x - 1] ?? 0) <=
			(nums[x + 1] ?? 0) - (nums[x] ?? 0)
			? x - 1
			: x + 1;
	};
	// right[i]: cost from 0 to i walking right; left[i]: cost from i to 0 walking left.
	const right = [0];
	const left = [0];
	for (let i = 1; i < n; i++) {
		const gap = (nums[i] ?? 0) - (nums[i - 1] ?? 0);
		right.push((right[i - 1] ?? 0) + (closest(i - 1) === i ? 1 : gap));
		left.push((left[i - 1] ?? 0) + (closest(i) === i - 1 ? 1 : gap));
	}
	return queries.map(([l = 0, r = 0]) =>
		l <= r
			? (right[r] ?? 0) - (right[l] ?? 0)
			: (left[l] ?? 0) - (left[r] ?? 0),
	);
};
