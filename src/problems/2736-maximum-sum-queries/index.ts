/**
 * 2736. Maximum Sum Queries
 *
 * For each query `[x, y]`, returns the largest `nums1[j] + nums2[j]` over
 * indices with `nums1[j] >= x` and `nums2[j] >= y`, or -1 if none.
 *
 * Answer queries by decreasing `x`, adding points by decreasing `nums1`.
 * Keep a stack with `nums2` increasing and sums decreasing: a new point
 * pops points it beats on sum (which it must also match on `nums2`), and
 * is skipped if the top beats it on both. A query binary searches the
 * first entry with `nums2 >= y`.
 *
 * @see https://leetcode.com/problems/maximum-sum-queries/
 * @difficulty Hard
 * @timeComplexity O((n + q) log(n + q))
 * @spaceComplexity O(n + q)
 *
 * @example
 * maximumSumQueries([4, 3, 1, 2], [2, 4, 9, 5], [[4, 1], [1, 3], [2, 5]]); // [6, 10, 7]
 */
export const maximumSumQueries = (
	nums1: readonly number[],
	nums2: readonly number[],
	queries: readonly (readonly number[])[],
): number[] => {
	const points = nums1
		.map((_, i) => i)
		.sort((a, b) => (nums1[b] ?? 0) - (nums1[a] ?? 0));
	const order = queries
		.map((_, i) => i)
		.sort((a, b) => (queries[b]?.[0] ?? 0) - (queries[a]?.[0] ?? 0));
	const stack: [y: number, sum: number][] = [];
	const answer = queries.map(() => -1);
	let next = 0;
	for (const q of order) {
		const [x = 0, y = 0] = queries[q] ?? [];
		for (
			;
			next < points.length && (nums1[points[next] ?? 0] ?? 0) >= x;
			next++
		) {
			const i = points[next] ?? 0;
			const py = nums2[i] ?? 0;
			const sum = (nums1[i] ?? 0) + py;
			while ((stack.at(-1)?.[1] ?? Number.POSITIVE_INFINITY) <= sum)
				stack.pop();
			if ((stack.at(-1)?.[0] ?? Number.NEGATIVE_INFINITY) < py)
				stack.push([py, sum]);
		}
		let low = 0;
		let high = stack.length;
		while (low < high) {
			const mid = (low + high) >> 1;
			if ((stack[mid]?.[0] ?? 0) < y) low = mid + 1;
			else high = mid;
		}
		answer[q] = stack[low]?.[1] ?? -1;
	}
	return answer;
};
