/**
 * 3430. Maximum and Minimum Sums of at Most Size K Subarrays
 *
 * Over every subarray of `nums` with at most `k` elements, add up its
 * largest and smallest elements.
 *
 * Each element is the minimum of the subarrays reaching from a range of
 * starts on its left to a range of ends on its right (found with monotonic
 * stacks, ties going to the leftmost). Count the pairs of extents that keep
 * the length at most k in closed form, and do the same for maxima. The
 * total can pass 2⁵³, so it's added up with BigInt, though LeetCode's
 * JavaScript signature returns a number.
 *
 * @see https://leetcode.com/problems/maximum-and-minimum-sums-of-at-most-size-k-subarrays/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * maximumAndMinimumSumsOfAtMostSizeKSubarrays([1, 2, 3], 2); // 20
 */
export const maximumAndMinimumSumsOfAtMostSizeKSubarrays = (
	nums: readonly number[],
	k: number,
): number => {
	const n = nums.length;
	/** Subarrays with left extent below `a`, right extent below `b`, and a + b + 1 ≤ k. */
	const count = (a: number, b: number): number => {
		// Σ over left extents x in [0, min(a, k) - 1] of min(b, k - x).
		const xs = Math.min(a, k);
		const full = Math.max(0, Math.min(xs, k - b + 1));
		let total = full * b;
		const from = full;
		const to = xs - 1;
		if (to >= from) total += ((k - from + (k - to)) * (to - from + 1)) / 2;
		return total;
	};
	let total = 0n;
	for (const sign of [1, -1]) {
		const value = (i: number): number => sign * (nums[i] ?? 0);
		const left = new Int32Array(n);
		const right = new Int32Array(n);
		const stack: number[] = [];
		for (let i = 0; i < n; i++) {
			while (stack.length > 0 && value(stack.at(-1) ?? 0) > value(i))
				right[stack.pop() ?? 0] = i;
			left[i] = stack.length > 0 ? (stack.at(-1) ?? -1) : -1;
			stack.push(i);
		}
		for (const i of stack) right[i] = n;
		for (let i = 0; i < n; i++)
			total +=
				BigInt(nums[i] ?? 0) *
				BigInt(count(i - (left[i] ?? 0), (right[i] ?? 0) - i));
	}
	return Number(total);
};
