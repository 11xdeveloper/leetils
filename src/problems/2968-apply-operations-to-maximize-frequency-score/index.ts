/**
 * 2968. Apply Operations to Maximize Frequency Score
 *
 * Up to `k` operations each move an element by 1. Returns the largest
 * possible count of the most frequent element.
 *
 * Sort and slide a window; the cheapest way to make a window equal moves
 * everything to its median, priced with prefix sums. Shrink while it
 * costs more than `k`.
 *
 * @see https://leetcode.com/problems/apply-operations-to-maximize-frequency-score/
 * @difficulty Hard
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * applyOperationsToMaximizeFrequencyScore([1, 2, 6, 4], 3); // 3
 */
export const applyOperationsToMaximizeFrequencyScore = (
	nums: readonly number[],
	k: number,
): number => {
	const sorted = nums.toSorted((a, b) => a - b);
	const prefix = [0];
	for (const num of sorted) prefix.push((prefix.at(-1) ?? 0) + num);
	const cost = (left: number, right: number): number => {
		const mid = (left + right) >> 1;
		const median = sorted[mid] ?? 0;
		const below =
			median * (mid - left) - ((prefix[mid] ?? 0) - (prefix[left] ?? 0));
		const above =
			(prefix[right + 1] ?? 0) -
			(prefix[mid + 1] ?? 0) -
			median * (right - mid);
		return below + above;
	};
	let best = 0;
	let left = 0;
	for (let right = 0; right < sorted.length; right++) {
		while (cost(left, right) > k) left++;
		best = Math.max(best, right - left + 1);
	}
	return best;
};
