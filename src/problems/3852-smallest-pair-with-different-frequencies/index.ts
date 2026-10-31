/**
 * 3852. Smallest Pair With Different Frequencies
 *
 * Among values x < y in `nums` that appear a different number of times,
 * returns the pair with the smallest x, then the smallest y, or [-1, -1].
 *
 * @see https://leetcode.com/problems/smallest-pair-with-different-frequencies/
 * @difficulty Easy
 * @timeComplexity O(n²)
 * @spaceComplexity O(n)
 *
 * @example
 * smallestPairWithDifferentFrequencies([1, 1, 2, 2, 3, 4]); // [1, 3]
 */
export const smallestPairWithDifferentFrequencies = (
	nums: readonly number[],
): number[] => {
	const counts = new Map<number, number>();
	for (const num of nums) counts.set(num, (counts.get(num) ?? 0) + 1);
	const values = [...counts.keys()].sort((a, b) => a - b);
	for (let i = 0; i < values.length; i++)
		for (let j = i + 1; j < values.length; j++)
			if (counts.get(values[i] ?? 0) !== counts.get(values[j] ?? 0))
				return [values[i] ?? 0, values[j] ?? 0];
	return [-1, -1];
};
