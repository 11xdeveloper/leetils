/**
 * 1838. Frequency of the Most Frequent Element
 *
 * With at most `k` increments spread over elements of `nums`, returns the
 * largest possible count of one value.
 *
 * Sorted, the best target is some element raising the ones just below it.
 * Slide a window, shrinking it while raising everything in it to its
 * largest element costs more than `k`.
 *
 * @see https://leetcode.com/problems/frequency-of-the-most-frequent-element/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * frequencyOfTheMostFrequentElement([1, 2, 4], 5); // 3
 */
export const frequencyOfTheMostFrequentElement = (
	nums: readonly number[],
	k: number,
): number => {
	const sorted = nums.toSorted((a, b) => a - b);
	let [left, sum, best] = [0, 0, 0];
	for (let right = 0; right < sorted.length; right++) {
		const target = sorted[right] ?? 0;
		sum += target;
		while (target * (right - left + 1) - sum > k) {
			sum -= sorted[left] ?? 0;
			left++;
		}
		best = Math.max(best, right - left + 1);
	}
	return best;
};
