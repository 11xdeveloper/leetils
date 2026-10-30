/**
 * 2195. Append K Integers With Minimal Sum
 *
 * Appends `k` distinct positive integers not already in `nums` with the
 * smallest possible sum, and returns that sum.
 *
 * Take the smallest missing numbers: walk the sorted distinct values,
 * summing the gaps between them as arithmetic series.
 *
 * @see https://leetcode.com/problems/append-k-integers-with-minimal-sum/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * appendKIntegersWithMinimalSum([1, 4, 25, 10, 25], 2); // 5
 */
export const appendKIntegersWithMinimalSum = (
	nums: readonly number[],
	k: number,
): number => {
	const series = (from: number, to: number): number =>
		((from + to) * (to - from + 1)) / 2;
	let [sum, next] = [0, 1];
	for (const num of [...new Set(nums)].sort((a, b) => a - b)) {
		const gap = Math.min(num - next, k);
		if (gap > 0) {
			sum += series(next, next + gap - 1);
			k -= gap;
		}
		if (k === 0) return sum;
		next = num + 1;
	}
	return sum + series(next, next + k - 1);
};
