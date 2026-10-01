/**
 * 995. Minimum Number of K Consecutive Bit Flips
 *
 * A flip inverts `k` consecutive bits of the binary array `nums`. Returns
 * the fewest flips that make every bit 1, or -1 if that's impossible.
 *
 * Greedy from the left: the leftmost 0 can only be fixed by a flip starting
 * there. It tracks how many active flips cover each position (flips ending
 * are removed via a record of where each started) instead of flipping bits
 * one by one.
 *
 * @see https://leetcode.com/problems/minimum-number-of-k-consecutive-bit-flips/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumNumberOfKConsecutiveBitFlips([0, 0, 0, 1, 0, 1, 1, 0], 3); // 3
 */
export const minimumNumberOfKConsecutiveBitFlips = (
	nums: readonly number[],
	k: number,
): number => {
	const n = nums.length;
	const started = new Uint8Array(n);
	let active = 0;
	let flips = 0;
	for (let i = 0; i < n; i++) {
		if (i >= k && started[i - k]) active--;
		if (((nums[i] ?? 0) + active) % 2 === 0) {
			if (i + k > n) return -1;
			started[i] = 1;
			active++;
			flips++;
		}
	}
	return flips;
};
