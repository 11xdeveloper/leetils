/**
 * 3843. First Element with Unique Frequency
 *
 * The first element (left to right) whose number of occurrences no other
 * value shares, or -1.
 *
 * @see https://leetcode.com/problems/first-element-with-unique-frequency/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * firstElementWithUniqueFrequency([20, 20, 10, 30, 30, 30]); // 20
 */
export const firstElementWithUniqueFrequency = (
	nums: readonly number[],
): number => {
	const counts = new Map<number, number>();
	for (const num of nums) counts.set(num, (counts.get(num) ?? 0) + 1);
	const sharing = new Map<number, number>();
	for (const count of counts.values())
		sharing.set(count, (sharing.get(count) ?? 0) + 1);
	return nums.find((num) => sharing.get(counts.get(num) ?? 0) === 1) ?? -1;
};
