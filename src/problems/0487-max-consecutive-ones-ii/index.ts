/**
 * 487. Max Consecutive Ones II
 *
 * Returns the length of the longest run of 1s in the binary array `nums`
 * after flipping at most one 0 to a 1.
 *
 * Sliding window holding at most one 0: remembers where the last 0 was, and
 * when another arrives the window restarts just after it. This works on a
 * stream, as the follow-up asks, since it never looks back at the input.
 *
 * @see https://leetcode.com/problems/max-consecutive-ones-ii/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * maxConsecutiveOnesII([1, 0, 1, 1, 0]); // 4
 */
export const maxConsecutiveOnesII = (nums: readonly number[]): number => {
	let longest = 0;
	let start = 0;
	let lastZero = -1;

	for (const [i, num] of nums.entries()) {
		if (num === 0) {
			start = lastZero + 1;
			lastZero = i;
		}
		longest = Math.max(longest, i - start + 1);
	}

	return longest;
};
