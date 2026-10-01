/**
 * 1959. Minimum Total Space Wasted With K Resizing Operations
 *
 * An array must hold `nums[t]` elements at time `t`; it may be resized at
 * most `k` times. Returns the least total unused space over all times.
 *
 * Resizing splits time into at most `k + 1` segments, each sized to its
 * maximum. `best[j][i]` covers the first `i` times with `j` segments, the
 * last segment's waste being `max · length − sum`.
 *
 * @see https://leetcode.com/problems/minimum-total-space-wasted-with-k-resizing-operations/
 * @difficulty Medium
 * @timeComplexity O(k · n^2)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumTotalSpaceWastedWithKResizingOperations([10, 20, 15, 30, 20], 2); // 15
 */
export const minimumTotalSpaceWastedWithKResizingOperations = (
	nums: readonly number[],
	k: number,
): number => {
	const n = nums.length;
	let best = new Array<number>(n + 1).fill(Infinity);
	best[0] = 0;
	for (let segments = 1; segments <= k + 1; segments++) {
		const next = new Array<number>(n + 1).fill(Infinity);
		next[0] = 0;
		for (let end = 1; end <= n; end++) {
			let [largest, sum] = [0, 0];
			for (let start = end - 1; start >= 0; start--) {
				const value = nums[start] ?? 0;
				largest = Math.max(largest, value);
				sum += value;
				next[end] = Math.min(
					next[end] ?? Infinity,
					(best[start] ?? Infinity) + largest * (end - start) - sum,
				);
			}
		}
		best = next;
	}
	return best[n] ?? 0;
};
