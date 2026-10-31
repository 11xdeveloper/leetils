/**
 * 3473. Sum of K Subarrays With Length at Least M
 *
 * The largest total of `k` non-overlapping subarrays of `nums`, each at
 * least `m` long.
 *
 * `best[j][i]` is the best with j subarrays in the first i elements: skip
 * element i, or end the j-th subarray there, starting at some t ≤ i - m.
 * Keep the running best of `best[j - 1][t] - prefix[t]` so each step is
 * O(1).
 *
 * @see https://leetcode.com/problems/sum-of-k-subarrays-with-length-at-least-m/
 * @difficulty Medium
 * @timeComplexity O(n · k)
 * @spaceComplexity O(n)
 *
 * @example
 * sumOfKSubarraysWithLengthAtLeastM([1, 2, -1, 3, 3, 4], 2, 2); // 13
 */
export const sumOfKSubarraysWithLengthAtLeastM = (
	nums: readonly number[],
	k: number,
	m: number,
): number => {
	const n = nums.length;
	const prefix = [0];
	for (const num of nums) prefix.push((prefix.at(-1) ?? 0) + num);
	const NONE = Number.NEGATIVE_INFINITY;
	let previous = new Float64Array(n + 1);
	for (let j = 1; j <= k; j++) {
		const current = new Float64Array(n + 1).fill(NONE);
		let bestStart = NONE;
		for (let i = 1; i <= n; i++) {
			if (i - m >= 0)
				bestStart = Math.max(
					bestStart,
					(previous[i - m] ?? NONE) - (prefix[i - m] ?? 0),
				);
			current[i] = Math.max(
				current[i - 1] ?? NONE,
				bestStart + (prefix[i] ?? 0),
			);
		}
		previous = current;
	}
	return previous[n] ?? 0;
};
