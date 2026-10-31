/**
 * 3371. Identify the Largest Outlier in an Array
 *
 * All but two elements of `nums` are special; one of the other two is their
 * sum and the last is an outlier. Returns the largest value the outlier
 * could be.
 *
 * If x is the outlier, the rest add up to twice the sum element, so
 * (total - x) / 2 must be another element of the array.
 *
 * @see https://leetcode.com/problems/identify-the-largest-outlier-in-an-array/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * identifyTheLargestOutlierInAnArray([2, 3, 5, 10]); // 10
 */
export const identifyTheLargestOutlierInAnArray = (
	nums: readonly number[],
): number => {
	const total = nums.reduce((a, b) => a + b, 0);
	const counts = new Map<number, number>();
	for (const num of nums) counts.set(num, (counts.get(num) ?? 0) + 1);
	let best = Number.NEGATIVE_INFINITY;
	for (const x of nums) {
		const rest = total - x;
		if (rest % 2 !== 0) continue;
		const sum = rest / 2;
		const available = (counts.get(sum) ?? 0) - (sum === x ? 1 : 0);
		if (available > 0) best = Math.max(best, x);
	}
	return best;
};
