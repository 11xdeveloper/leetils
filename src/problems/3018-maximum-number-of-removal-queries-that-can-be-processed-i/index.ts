/**
 * 3018. Maximum Number of Removal Queries That Can Be Processed I
 *
 * First, optionally replace `nums` with any subsequence of it. Then process
 * `queries` in order: stop if both ends of `nums` are below the query,
 * otherwise remove an end that's at least the query. Returns the most
 * queries that can be processed.
 *
 * Dropping elements up front is the same as removing ends for free. Let
 * `best[i][j]` be the most queries processed with `nums[i..j]` left, built
 * from the longer ranges either side: the removed end counts if it covers
 * the next query, and is dropped for free otherwise. Finish by trying to
 * remove each last element.
 *
 * @see https://leetcode.com/problems/maximum-number-of-removal-queries-that-can-be-processed-i/
 * @difficulty Hard
 * @timeComplexity O(n²)
 * @spaceComplexity O(n²)
 *
 * @example
 * maximumNumberOfRemovalQueriesThatCanBeProcessedI([1, 2, 3, 4, 5], [1, 2, 3, 4, 6]); // 4
 */
export const maximumNumberOfRemovalQueriesThatCanBeProcessedI = (
	nums: readonly number[],
	queries: readonly number[],
): number => {
	const n = nums.length;
	const m = queries.length;
	const best = Array.from({ length: n }, () => new Int32Array(n));
	const step = (done: number, value: number): number =>
		done < m && value >= (queries[done] ?? 0) ? done + 1 : done;
	let answer = 0;
	for (let length = n; length >= 1; length--)
		for (let i = 0; i + length <= n; i++) {
			const j = i + length - 1;
			let done = 0;
			if (i > 0)
				done = Math.max(done, step(best[i - 1]?.[j] ?? 0, nums[i - 1] ?? 0));
			if (j < n - 1)
				done = Math.max(done, step(best[i]?.[j + 1] ?? 0, nums[j + 1] ?? 0));
			const row = best[i];
			if (row) row[j] = done;
			if (length === 1) answer = Math.max(answer, step(done, nums[i] ?? 0));
		}
	return answer;
};
