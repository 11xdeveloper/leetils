/**
 * 3489. Zero Array Transformation IV
 *
 * Each query `[l, r, val]` may subtract `val` from any chosen indices in
 * its range. Returns the fewest queries, taken in order from the first,
 * that can turn `nums` into all zeros, or -1.
 *
 * Indices are independent: each needs some of the queries covering it to
 * add up to exactly its value. Keep, per index, the set of reachable sums
 * as a bitset, adding queries one at a time until every index can reach
 * its value.
 *
 * @see https://leetcode.com/problems/zero-array-transformation-iv/
 * @difficulty Medium
 * @timeComplexity O(q · n · max)
 * @spaceComplexity O(n · max)
 *
 * @example
 * zeroArrayTransformationIV([2, 0, 2], [[0, 2, 1], [0, 2, 1], [1, 1, 3]]); // 2
 */
export const zeroArrayTransformationIV = (
	nums: readonly number[],
	queries: readonly (readonly number[])[],
): number => {
	const reachable = nums.map((num) => {
		const sums = new Uint8Array(num + 1);
		sums[0] = 1;
		return sums;
	});
	const done = (): boolean => nums.every((num, i) => reachable[i]?.[num] === 1);
	if (done()) return 0;
	for (let q = 0; q < queries.length; q++) {
		const [l = 0, r = 0, val = 0] = queries[q] ?? [];
		for (let i = l; i <= r; i++) {
			const sums = reachable[i];
			if (!sums) continue;
			for (let s = sums.length - 1; s >= val; s--)
				if (sums[s - val]) sums[s] = 1;
		}
		if (done()) return q + 1;
	}
	return -1;
};
