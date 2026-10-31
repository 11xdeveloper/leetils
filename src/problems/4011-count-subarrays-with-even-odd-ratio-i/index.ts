/**
 * 4011. Count Subarrays With Even Odd Ratio I
 *
 * Counts subarrays with at least one odd element whose evens-to-odds
 * ratio is at most a/b.
 *
 * Extend from every start, comparing x · b ≤ a · y.
 *
 * @see https://leetcode.com/problems/count-subarrays-with-even-odd-ratio-i/
 * @difficulty Medium
 * @timeComplexity O(n²)
 * @spaceComplexity O(1)
 *
 * @example
 * countSubarraysWithEvenOddRatioI([1, 2, 1, 2], 3, 2); // 7
 */
export const countSubarraysWithEvenOddRatioI = (
	nums: readonly number[],
	a: number,
	b: number,
): number => {
	let count = 0;
	for (let i = 0; i < nums.length; i++) {
		let [evens, odds] = [0, 0];
		for (let j = i; j < nums.length; j++) {
			if ((nums[j] ?? 0) % 2 === 0) evens++;
			else odds++;
			if (odds > 0 && evens * b <= a * odds) count++;
		}
	}
	return count;
};
