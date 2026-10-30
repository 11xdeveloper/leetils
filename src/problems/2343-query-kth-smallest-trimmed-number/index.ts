/**
 * 2343. Query Kth Smallest Trimmed Number
 *
 * For each query `[k, trim]`, trims every number string to its last
 * `trim` digits and returns the index of the `k`-th smallest (smaller
 * index on ties).
 *
 * Trimmed strings have equal length, so sort indices by them as strings.
 *
 * @see https://leetcode.com/problems/query-kth-smallest-trimmed-number/
 * @difficulty Medium
 * @timeComplexity O(q · n log n · m)
 * @spaceComplexity O(n · m)
 *
 * @example
 * queryKthSmallestTrimmedNumber(["102", "473", "251", "814"], [[1, 1], [2, 3], [4, 2], [1, 2]]); // [2, 2, 1, 0]
 */
export const queryKthSmallestTrimmedNumber = (
	nums: readonly string[],
	queries: readonly (readonly number[])[],
): number[] =>
	queries.map(([k = 1, trim = 0]) => {
		const trimmed = nums.map((num) => num.slice(num.length - trim));
		const order = nums
			.map((_, i) => i)
			.sort((a, b) => {
				const [x = "", y = ""] = [trimmed[a], trimmed[b]];
				return x < y ? -1 : x > y ? 1 : a - b;
			});
		return order[k - 1] ?? -1;
	});
