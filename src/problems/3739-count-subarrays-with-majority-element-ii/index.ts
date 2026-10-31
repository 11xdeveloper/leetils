/**
 * 3739. Count Subarrays With Majority Element II
 *
 * Counts subarrays in which `target` makes up more than half the
 * elements.
 *
 * Score the target +1 and everything else -1: a subarray qualifies when
 * its prefix sum rises across it. Sweep the prefix sums, which move by 1
 * at a time, keeping how many earlier prefixes sit below the current one.
 *
 * @see https://leetcode.com/problems/count-subarrays-with-majority-element-ii/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * countSubarraysWithMajorityElementII([1, 2, 2, 3], 2); // 5
 */
export const countSubarraysWithMajorityElementII = (
	nums: readonly number[],
	target: number,
): number => {
	const n = nums.length;
	// seen[p + n]: earlier prefixes equal to p.
	const seen = new Int32Array(2 * n + 2);
	let prefix = 0;
	seen[n] = 1;
	let below = 0;
	let count = 0;
	for (const num of nums) {
		if (num === target) {
			below += seen[prefix + n] ?? 0;
			prefix++;
		} else {
			prefix--;
			below -= seen[prefix + n] ?? 0;
		}
		count += below;
		seen[prefix + n] = (seen[prefix + n] ?? 0) + 1;
	}
	return count;
};
