/**
 * 1330. Reverse Subarray To Maximize Array Value
 *
 * The value of an array is the sum of `|nums[i] − nums[i + 1]|`. Returns the
 * largest value reachable by reversing at most one subarray.
 *
 * Reversing `nums[l … r]` only changes the two boundary differences. If the
 * subarray touches an end, one boundary changes, and every such reversal is
 * checked directly. Otherwise, swapping pairs `(a, b)` at the left edge and
 * `(c, d)` at the right edge gains at most `2 · (min(c, d) − max(a, b))`,
 * achieved by the best pair of neighbouring pairs, so the largest pair
 * minimum and smallest pair maximum give the best gain.
 *
 * @see https://leetcode.com/problems/reverse-subarray-to-maximize-array-value/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * reverseSubarrayToMaximizeArrayValue([2, 3, 1, 5, 4]); // 10
 */
export const reverseSubarrayToMaximizeArrayValue = (
	nums: readonly number[],
): number => {
	const n = nums.length;
	const at = (i: number) => nums[i] ?? 0;
	let base = 0;
	let gain = 0;
	let [largestMin, smallestMax] = [-Infinity, Infinity];
	for (let i = 0; i + 1 < n; i++) {
		const [a, b] = [at(i), at(i + 1)];
		const edge = Math.abs(a - b);
		base += edge;
		// Reversing nums[0 … i] or nums[i + 1 … n − 1].
		gain = Math.max(
			gain,
			Math.abs(at(0) - b) - edge,
			Math.abs(at(n - 1) - a) - edge,
		);
		largestMin = Math.max(largestMin, Math.min(a, b));
		smallestMax = Math.min(smallestMax, Math.max(a, b));
	}
	gain = Math.max(gain, 2 * (largestMin - smallestMax));
	return base + gain;
};
