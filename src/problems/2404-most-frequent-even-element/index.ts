/**
 * 2404. Most Frequent Even Element
 *
 * Returns the most frequent even number (smallest on ties), or -1.
 *
 * @see https://leetcode.com/problems/most-frequent-even-element/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * mostFrequentEvenElement([0, 1, 2, 2, 4, 4, 1]); // 2
 */
export const mostFrequentEvenElement = (nums: readonly number[]): number => {
	const counts = new Map<number, number>();
	for (const num of nums)
		if (num % 2 === 0) counts.set(num, (counts.get(num) ?? 0) + 1);
	let [best, bestCount] = [-1, 0];
	for (const [num, count] of counts) {
		if (count > bestCount || (count === bestCount && num < best))
			[best, bestCount] = [num, count];
	}
	return best;
};
