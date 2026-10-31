const MOD = 1_000_000_007;

/**
 * 3284. Sum of Consecutive Subarrays
 *
 * A consecutive array steps by +1 throughout or by -1 throughout (a single
 * element counts). Returns the total of the values of all consecutive
 * subarrays of `nums`, modulo 10⁹ + 7.
 *
 * Every consecutive subarray of two or more lies inside a maximal run of +1
 * steps or of -1 steps, and an element at offset j of a run of length L is
 * in (j + 1)(L - j) of its subarrays. Add that up over both kinds of runs,
 * then remove the single elements, which both kinds count.
 *
 * @see https://leetcode.com/problems/sum-of-consecutive-subarrays/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * sumOfConsecutiveSubarrays([1, 2, 3]); // 20
 */
export const sumOfConsecutiveSubarrays = (nums: readonly number[]): number => {
	const n = nums.length;
	let total = 0;
	for (const step of [1, -1])
		for (let start = 0; start < n; ) {
			let end = start;
			while (end + 1 < n && (nums[end + 1] ?? 0) - (nums[end] ?? 0) === step)
				end++;
			const length = end - start + 1;
			for (let j = 0; j < length; j++)
				total =
					(total + (((j + 1) * (length - j)) % MOD) * (nums[start + j] ?? 0)) %
					MOD;
			start = end + 1;
		}
	for (const num of nums) total = (total - num + MOD) % MOD;
	return total;
};
