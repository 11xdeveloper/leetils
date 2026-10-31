/**
 * 3830. Longest Alternating Subarray After Removing At Most One Element
 *
 * After removing at most one element of `nums`, returns the longest
 * subarray whose neighbour comparisons alternate strictly between up and
 * down.
 *
 * Record the longest alternating run ending and starting at each index.
 * Removing element i joins a run ending at i - 1 to one starting at
 * i + 1, if the new comparison between them is strict and fits the
 * pattern on both sides; otherwise only the single elements next to the
 * gap join.
 *
 * @see https://leetcode.com/problems/longest-alternating-subarray-after-removing-at-most-one-element/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * longestAlternatingSubarrayAfterRemovingAtMostOneElement([3, 2, 1, 2, 3, 2, 1]); // 4
 */
export const longestAlternatingSubarrayAfterRemovingAtMostOneElement = (
	nums: readonly number[],
): number => {
	const n = nums.length;
	const sign = (i: number, j: number) =>
		Math.sign((nums[j] ?? 0) - (nums[i] ?? 0));
	const ending = new Array<number>(n).fill(1);
	const starting = new Array<number>(n).fill(1);
	for (let i = 1; i < n; i++) {
		const s = sign(i - 1, i);
		if (s === 0) continue;
		ending[i] =
			i >= 2 && (ending[i - 1] ?? 0) >= 2 && sign(i - 2, i - 1) === -s
				? (ending[i - 1] ?? 0) + 1
				: 2;
	}
	for (let i = n - 2; i >= 0; i--) {
		const s = sign(i, i + 1);
		if (s === 0) continue;
		starting[i] =
			(starting[i + 1] ?? 0) >= 2 && sign(i + 1, i + 2) === -s
				? (starting[i + 1] ?? 0) + 1
				: 2;
	}
	let best = Math.max(...ending);
	for (let i = 1; i + 1 < n; i++) {
		const s = sign(i - 1, i + 1);
		if (s === 0) continue;
		const left =
			(ending[i - 1] ?? 0) >= 2 && sign(i - 2, i - 1) === -s
				? (ending[i - 1] ?? 0)
				: 1;
		const right =
			(starting[i + 1] ?? 0) >= 2 && sign(i + 1, i + 2) === -s
				? (starting[i + 1] ?? 0)
				: 1;
		best = Math.max(best, left + right);
	}
	return best;
};
