/**
 * 3005. Count Elements With Maximum Frequency
 *
 * The total frequency of the elements of `nums` whose frequency is the
 * highest.
 *
 * Count frequencies, then add up those equal to the maximum.
 *
 * @see https://leetcode.com/problems/count-elements-with-maximum-frequency/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * countElementsWithMaximumFrequency([1, 2, 2, 3, 1, 4]); // 4
 */
export const countElementsWithMaximumFrequency = (
	nums: readonly number[],
): number => {
	const counts = new Map<number, number>();
	for (const num of nums) counts.set(num, (counts.get(num) ?? 0) + 1);
	const max = Math.max(...counts.values());
	let total = 0;
	for (const count of counts.values()) if (count === max) total += count;
	return total;
};
