/**
 * 3201. Find the Maximum Length of Valid Subsequence I
 *
 * The longest subsequence of `nums` where every neighbouring pair's sum has
 * the same parity.
 *
 * That means the parities are all equal or strictly alternate. Take the
 * larger of the even and odd counts and the longest alternating
 * subsequence, which is built greedily.
 *
 * @see https://leetcode.com/problems/find-the-maximum-length-of-valid-subsequence-i/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * findTheMaximumLengthOfValidSubsequenceI([1, 2, 1, 1, 2, 1, 2]); // 6
 */
export const findTheMaximumLengthOfValidSubsequenceI = (
	nums: readonly number[],
): number => {
	let odd = 0;
	let alternating = 0;
	let last = -1;
	for (const num of nums) {
		const parity = num % 2;
		odd += parity;
		if (parity !== last) {
			alternating++;
			last = parity;
		}
	}
	return Math.max(odd, nums.length - odd, alternating);
};
