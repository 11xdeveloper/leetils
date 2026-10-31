/**
 * 2972. Count the Number of Incremovable Subarrays II
 *
 * A non-empty subarray is incremovable if deleting it leaves `nums`
 * strictly increasing. Returns how many there are, for arrays too long to
 * try each one.
 *
 * What's kept is a strictly increasing prefix and suffix that join
 * properly. For each kept suffix start, from the end inwards, the
 * longest compatible prefix shrinks; two pointers count them.
 *
 * @see https://leetcode.com/problems/count-the-number-of-incremovable-subarrays-ii/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * countTheNumberOfIncremovableSubarraysII([6, 5, 7, 8]); // 7
 */
export const countTheNumberOfIncremovableSubarraysII = (
	nums: readonly number[],
): number => {
	const n = nums.length;
	let prefixEnd = 0;
	while (
		prefixEnd + 1 < n &&
		(nums[prefixEnd] ?? 0) < (nums[prefixEnd + 1] ?? 0)
	)
		prefixEnd++;
	if (prefixEnd === n - 1) return (n * (n + 1)) / 2;

	// Removing a suffix: keep a prefix of length 0..prefixEnd + 1.
	let count = prefixEnd + 2;
	let i = prefixEnd;
	for (let j = n - 1; j > 0; j--) {
		while (i >= 0 && (nums[i] ?? 0) >= (nums[j] ?? 0)) i--;
		count += i + 2;
		if ((nums[j - 1] ?? 0) >= (nums[j] ?? 0)) break;
	}
	return count;
};
