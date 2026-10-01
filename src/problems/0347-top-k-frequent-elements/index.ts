/**
 * 347. Top K Frequent Elements
 *
 * Returns the `k` most frequent values in `nums`, in any order. The answer
 * is unique.
 *
 * Counts each value, then buckets the values by count: bucket `c` holds the
 * values appearing `c` times. Reading the buckets from the highest count
 * down gives the most frequent values without sorting, as the follow-up
 * asks.
 *
 * @see https://leetcode.com/problems/top-k-frequent-elements/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * topKFrequentElements([1, 1, 1, 2, 2, 3], 2); // [1, 2]
 */
export const topKFrequentElements = (
	nums: readonly number[],
	k: number,
): number[] => {
	const counts = new Map<number, number>();
	for (const num of nums) counts.set(num, (counts.get(num) ?? 0) + 1);

	const buckets: number[][] = Array.from({ length: nums.length + 1 }, () => []);
	for (const [num, count] of counts) buckets[count]?.push(num);

	const top: number[] = [];
	for (let count = nums.length; count > 0 && top.length < k; count--) {
		top.push(...(buckets[count] ?? []));
	}
	return top.slice(0, k);
};
