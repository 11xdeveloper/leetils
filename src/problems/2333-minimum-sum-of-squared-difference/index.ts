/**
 * 2333. Minimum Sum of Squared Difference
 *
 * May change elements of `nums1` by ±1 up to `k1` times and of `nums2` up
 * to `k2` times. Returns the smallest possible sum of squared differences.
 *
 * Only the differences matter, and `k1 + k2` unit reductions are best
 * spent on the largest differences. Level them down from the top using
 * counts of each difference.
 *
 * @see https://leetcode.com/problems/minimum-sum-of-squared-difference/
 * @difficulty Medium
 * @timeComplexity O(n + D) for differences up to D
 * @spaceComplexity O(D)
 *
 * @example
 * minimumSumOfSquaredDifference([1, 4, 10, 12], [5, 8, 6, 9], 1, 1); // 43
 */
export const minimumSumOfSquaredDifference = (
	nums1: readonly number[],
	nums2: readonly number[],
	k1: number,
	k2: number,
): number => {
	const differences = nums1.map((a, i) => Math.abs(a - (nums2[i] ?? 0)));
	const top = Math.max(0, ...differences);
	const counts = new Array<number>(top + 1).fill(0);
	for (const d of differences) counts[d] = (counts[d] ?? 0) + 1;

	let k = k1 + k2;
	let [level, atLevel] = [top, counts[top] ?? 0];
	while (level > 0 && k >= atLevel) {
		k -= atLevel;
		level--;
		atLevel += counts[level] ?? 0;
	}
	if (level === 0) return 0;
	let sum = (atLevel - k) * level * level + k * (level - 1) * (level - 1);
	for (let d = 1; d < level; d++) sum += (counts[d] ?? 0) * d * d;
	return sum;
};
