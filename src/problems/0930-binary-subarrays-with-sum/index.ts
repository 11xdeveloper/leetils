/**
 * 930. Binary Subarrays With Sum
 *
 * Counts the non-empty subarrays of the binary array `nums` summing to
 * `goal`.
 *
 * Counts prefix sums seen so far; each position pairs with every earlier
 * prefix that's `goal` smaller.
 *
 * @see https://leetcode.com/problems/binary-subarrays-with-sum/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * binarySubarraysWithSum([1, 0, 1, 0, 1], 2); // 4
 */
export const binarySubarraysWithSum = (
	nums: readonly number[],
	goal: number,
): number => {
	const counts = new Map([[0, 1]]);
	let sum = 0;
	let total = 0;
	for (const num of nums) {
		sum += num;
		total += counts.get(sum - goal) ?? 0;
		counts.set(sum, (counts.get(sum) ?? 0) + 1);
	}
	return total;
};
