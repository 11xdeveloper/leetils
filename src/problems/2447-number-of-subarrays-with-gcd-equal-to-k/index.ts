/**
 * 2447. Number of Subarrays With GCD Equal to K
 *
 * Counts the subarrays whose GCD is `k`.
 *
 * Extend from each start, stopping once the GCD is no longer a multiple
 * of `k`.
 *
 * @see https://leetcode.com/problems/number-of-subarrays-with-gcd-equal-to-k/
 * @difficulty Medium
 * @timeComplexity O(n^2 log max)
 * @spaceComplexity O(1)
 *
 * @example
 * numberOfSubarraysWithGcdEqualToK([9, 3, 1, 2, 6, 3], 3); // 4
 */
export const numberOfSubarraysWithGcdEqualToK = (
	nums: readonly number[],
	k: number,
): number => {
	const gcd = (a: number, b: number): number => {
		while (b) [a, b] = [b, a % b];
		return a;
	};
	let count = 0;
	for (let start = 0; start < nums.length; start++) {
		let current = 0;
		for (let end = start; end < nums.length; end++) {
			current = gcd(current, nums[end] ?? 0);
			if (current % k) break;
			if (current === k) count++;
		}
	}
	return count;
};
