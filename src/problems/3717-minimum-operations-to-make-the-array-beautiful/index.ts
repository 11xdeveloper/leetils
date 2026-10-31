/**
 * 3717. Minimum Operations to Make the Array Beautiful
 *
 * One operation increments an element. Returns the fewest operations
 * making every element a multiple of the one before it.
 *
 * Dynamic programming over the previous element's final value. Each
 * element becomes a multiple of the previous at least its own value;
 * values past twice the largest input never help, since a multiple of the
 * previous value no smaller than the input exists below that.
 *
 * @see https://leetcode.com/problems/minimum-operations-to-make-the-array-beautiful/
 * @difficulty Medium
 * @timeComplexity O(n · V log V)
 * @spaceComplexity O(V)
 *
 * @example
 * minimumOperationsToMakeTheArrayBeautiful([3, 7, 9]); // 2
 */
export const minimumOperationsToMakeTheArrayBeautiful = (
	nums: readonly number[],
): number => {
	const limit = 2 * Math.max(...nums);
	let cost = new Float64Array(limit + 1).fill(Number.POSITIVE_INFINITY);
	for (let v = nums[0] ?? 1; v <= limit; v++) cost[v] = v - (nums[0] ?? 1);
	for (let i = 1; i < nums.length; i++) {
		const target = nums[i] ?? 1;
		const next = new Float64Array(limit + 1).fill(Number.POSITIVE_INFINITY);
		for (let v = 1; v <= limit; v++) {
			const here = cost[v] ?? Number.POSITIVE_INFINITY;
			if (here === Number.POSITIVE_INFINITY) continue;
			for (let w = Math.ceil(target / v) * v; w <= limit; w += v)
				next[w] = Math.min(
					next[w] ?? Number.POSITIVE_INFINITY,
					here + w - target,
				);
		}
		cost = next;
	}
	return Math.min(...cost);
};
