/**
 * 1004. Max Consecutive Ones III
 *
 * Returns the longest run of 1s in the binary array `nums` after flipping
 * at most `k` zeros.
 *
 * Sliding window holding at most `k` zeros, shrinking from the left when it
 * holds more.
 *
 * @see https://leetcode.com/problems/max-consecutive-ones-iii/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * maxConsecutiveOnesIII([1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0], 2); // 6
 */
export const maxConsecutiveOnesIII = (
	nums: readonly number[],
	k: number,
): number => {
	let longest = 0;
	let zeros = 0;
	for (let left = 0, right = 0; right < nums.length; right++) {
		if (nums[right] === 0) zeros++;
		while (zeros > k) if (nums[left++] === 0) zeros--;
		longest = Math.max(longest, right - left + 1);
	}
	return longest;
};
