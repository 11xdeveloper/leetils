/**
 * 2762. Continuous Subarrays
 *
 * A subarray is continuous if any two of its elements differ by at most
 * 2. Returns the number of continuous subarrays.
 *
 * Slide a window, tracking its minimum and maximum with monotonic
 * deques; each right end adds the window's length.
 *
 * @see https://leetcode.com/problems/continuous-subarrays/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * continuousSubarrays([5, 4, 2, 4]); // 8
 */
export const continuousSubarrays = (nums: readonly number[]): number => {
	const lows: number[] = [];
	const highs: number[] = [];
	let lowHead = 0;
	let highHead = 0;
	let left = 0;
	let count = 0;
	const value = (i: number | undefined): number => nums[i ?? 0] ?? 0;
	for (const [right, num] of nums.entries()) {
		while (lows.length > lowHead && value(lows.at(-1)) >= num) lows.pop();
		lows.push(right);
		while (highs.length > highHead && value(highs.at(-1)) <= num) highs.pop();
		highs.push(right);
		while (value(highs[highHead]) - value(lows[lowHead]) > 2) {
			left++;
			if ((lows[lowHead] ?? 0) < left) lowHead++;
			if ((highs[highHead] ?? 0) < left) highHead++;
		}
		count += right - left + 1;
	}
	return count;
};
