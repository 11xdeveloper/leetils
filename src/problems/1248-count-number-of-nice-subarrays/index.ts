/**
 * 1248. Count Number of Nice Subarrays
 *
 * Returns the number of subarrays of `nums` containing exactly `k` odd
 * numbers.
 *
 * Counts prefixes by how many odd numbers they contain: a subarray ending
 * here is nice when the prefix before it had `k` fewer odd numbers.
 *
 * @see https://leetcode.com/problems/count-number-of-nice-subarrays/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * countNumberOfNiceSubarrays([2, 2, 2, 1, 2, 2, 1, 2, 2, 2], 2); // 16
 */
export const countNumberOfNiceSubarrays = (
	nums: readonly number[],
	k: number,
): number => {
	const prefixes = new Array<number>(nums.length + 1).fill(0);
	prefixes[0] = 1;
	let [odd, nice] = [0, 0];
	for (const num of nums) {
		odd += num % 2;
		nice += prefixes[odd - k] ?? 0;
		prefixes[odd] = (prefixes[odd] ?? 0) + 1;
	}
	return nice;
};
