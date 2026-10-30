/**
 * 2470. Number of Subarrays With LCM Equal to K
 *
 * Counts the subarrays whose least common multiple is `k`.
 *
 * Extend from each start, stopping once the LCM no longer divides `k`.
 *
 * @see https://leetcode.com/problems/number-of-subarrays-with-lcm-equal-to-k/
 * @difficulty Medium
 * @timeComplexity O(n^2 log k)
 * @spaceComplexity O(1)
 *
 * @example
 * numberOfSubarraysWithLcmEqualToK([3, 6, 2, 7, 1], 6); // 4
 */
export const numberOfSubarraysWithLcmEqualToK = (
	nums: readonly number[],
	k: number,
): number => {
	const gcd = (a: number, b: number): number => {
		while (b) [a, b] = [b, a % b];
		return a;
	};
	let count = 0;
	for (let start = 0; start < nums.length; start++) {
		let lcm = 1;
		for (let end = start; end < nums.length; end++) {
			const num = nums[end] ?? 1;
			lcm = (lcm / gcd(lcm, num)) * num;
			if (k % lcm) break;
			if (lcm === k) count++;
		}
	}
	return count;
};
