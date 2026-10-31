/**
 * 3095. Shortest Subarray With OR at Least K I
 *
 * The length of the shortest non-empty subarray of `nums` whose bitwise OR
 * is at least `k`, or -1 if there's none.
 *
 * Slide a window, counting how many of its elements set each bit so the OR
 * can be updated as elements leave. Shrink from the left while the OR stays
 * at least `k`.
 *
 * @see https://leetcode.com/problems/shortest-subarray-with-or-at-least-k-i/
 * @difficulty Easy
 * @timeComplexity O(n log max)
 * @spaceComplexity O(log max)
 *
 * @example
 * shortestSubarrayWithOrAtLeastKI([2, 1, 8], 10); // 3
 */
export const shortestSubarrayWithOrAtLeastKI = (
	nums: readonly number[],
	k: number,
): number => {
	const bits = new Int32Array(31);
	let or = 0;
	const update = (num: number, delta: number): void => {
		for (let bit = 0; bit < 31; bit++)
			if ((num >> bit) & 1) {
				bits[bit] = (bits[bit] ?? 0) + delta;
				if (bits[bit] === 0) or &= ~(1 << bit);
				else or |= 1 << bit;
			}
	};
	let best = Number.POSITIVE_INFINITY;
	for (let left = 0, right = 0; right < nums.length; right++) {
		update(nums[right] ?? 0, 1);
		while (left <= right && or >= k) {
			best = Math.min(best, right - left + 1);
			update(nums[left++] ?? 0, -1);
		}
	}
	return best === Number.POSITIVE_INFINITY ? -1 : best;
};
