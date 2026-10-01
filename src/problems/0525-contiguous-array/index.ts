/**
 * 525. Contiguous Array
 *
 * Returns the length of the longest subarray of the binary array `nums`
 * with as many 0s as 1s.
 *
 * Counting 1 as +1 and 0 as -1, such a subarray sums to 0, so the running
 * balance is the same before and after it. It records the first index for
 * each balance and measures back to it.
 *
 * @see https://leetcode.com/problems/contiguous-array/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * contiguousArray([0, 1, 1, 1, 1, 1, 0, 0, 0]); // 6
 */
export const contiguousArray = (nums: readonly number[]): number => {
	const firstSeen = new Map([[0, -1]]);
	let balance = 0;
	let longest = 0;

	for (const [i, num] of nums.entries()) {
		balance += num === 1 ? 1 : -1;
		const first = firstSeen.get(balance);
		if (first === undefined) firstSeen.set(balance, i);
		else longest = Math.max(longest, i - first);
	}

	return longest;
};
