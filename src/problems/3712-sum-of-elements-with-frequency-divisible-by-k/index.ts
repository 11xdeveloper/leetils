/**
 * 3712. Sum of Elements With Frequency Divisible by K
 *
 * Adds every element of `nums` whose value appears a multiple of `k`
 * times.
 *
 * @see https://leetcode.com/problems/sum-of-elements-with-frequency-divisible-by-k/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * sumOfElementsWithFrequencyDivisibleByK([1, 2, 2, 3, 3, 3, 3, 4], 2); // 16
 */
export const sumOfElementsWithFrequencyDivisibleByK = (
	nums: readonly number[],
	k: number,
): number => {
	const counts = new Map<number, number>();
	for (const num of nums) counts.set(num, (counts.get(num) ?? 0) + 1);
	let sum = 0;
	for (const [value, count] of counts)
		if (count % k === 0) sum += value * count;
	return sum;
};
