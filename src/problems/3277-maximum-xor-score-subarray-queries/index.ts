/**
 * 3277. Maximum XOR Score Subarray Queries
 *
 * An array's XOR score comes from repeatedly replacing each element with
 * its XOR with the next and dropping the last, until one value is left.
 * Returns, for each query `[l, r]`, the largest score of a subarray of
 * `nums[l..r]`.
 *
 * The score of `nums[i..j]` is the score of `nums[i..j-1]` XOR that of
 * `nums[i+1..j]`, and the best within `[i, j]` is the larger of that score
 * and the bests of those two smaller ranges. Fill both by decreasing start,
 * keeping one row at a time, and answer each query when its start comes
 * up.
 *
 * @see https://leetcode.com/problems/maximum-xor-score-subarray-queries/
 * @difficulty Hard
 * @timeComplexity O(n² + q)
 * @spaceComplexity O(n + q)
 *
 * @example
 * maximumXorScoreSubarrayQueries([2, 8, 4, 32, 16, 1], [[0, 2], [1, 4], [0, 5]]); // [12, 60, 60]
 */
export const maximumXorScoreSubarrayQueries = (
	nums: readonly number[],
	queries: readonly (readonly number[])[],
): number[] => {
	const n = nums.length;
	const byStart: number[][] = Array.from({ length: n }, () => []);
	queries.forEach(([l = 0], q) => {
		byStart[l]?.push(q);
	});
	const answers = new Array<number>(queries.length).fill(0);
	let score = new Int32Array(n);
	let best = new Int32Array(n);
	for (let i = n - 1; i >= 0; i--) {
		const nextScore = new Int32Array(n);
		const nextBest = new Int32Array(n);
		nextScore[i] = nums[i] ?? 0;
		nextBest[i] = nums[i] ?? 0;
		for (let j = i + 1; j < n; j++) {
			nextScore[j] = (nextScore[j - 1] ?? 0) ^ (score[j] ?? 0);
			nextBest[j] = Math.max(
				nextScore[j] ?? 0,
				nextBest[j - 1] ?? 0,
				best[j] ?? 0,
			);
		}
		score = nextScore;
		best = nextBest;
		for (const q of byStart[i] ?? [])
			answers[q] = best[queries[q]?.[1] ?? 0] ?? 0;
	}
	return answers;
};
