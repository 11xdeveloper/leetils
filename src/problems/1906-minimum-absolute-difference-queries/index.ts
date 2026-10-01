/**
 * 1906. Minimum Absolute Difference Queries
 *
 * For each query `[l, r]`, returns the smallest difference between two
 * distinct values in `nums[l … r]` (values 1–100), or -1 if all are equal.
 *
 * Prefix counts of each value let a query list the values present in its
 * range in increasing order, comparing neighbours.
 *
 * @see https://leetcode.com/problems/minimum-absolute-difference-queries/
 * @difficulty Medium
 * @timeComplexity O(100 · (n + q))
 * @spaceComplexity O(100 · n)
 *
 * @example
 * minimumAbsoluteDifferenceQueries([1, 3, 4, 8], [[0, 1], [1, 2], [2, 3], [0, 3]]); // [2, 1, 4, 1]
 */
export const minimumAbsoluteDifferenceQueries = (
	nums: readonly number[],
	queries: readonly (readonly number[])[],
): number[] => {
	const VALUES = 100;
	const prefix = [new Array<number>(VALUES + 1).fill(0)];
	for (const num of nums) {
		const counts = [...(prefix.at(-1) ?? [])];
		counts[num] = (counts[num] ?? 0) + 1;
		prefix.push(counts);
	}
	return queries.map(([l = 0, r = 0]) => {
		const [before, after] = [prefix[l] ?? [], prefix[r + 1] ?? []];
		let [best, last] = [Infinity, -1];
		for (let value = 1; value <= VALUES; value++) {
			if ((after[value] ?? 0) === (before[value] ?? 0)) continue;
			if (last !== -1) best = Math.min(best, value - last);
			last = value;
		}
		return best === Infinity ? -1 : best;
	});
};
