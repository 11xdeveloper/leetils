/**
 * 2817. Minimum Absolute Difference Between Elements With Constraint
 *
 * Returns the smallest `|nums[i] - nums[j]|` over pairs at least `x`
 * indices apart.
 *
 * Sweep `j` forward, adding `nums[j - x]` to a sorted list, and binary
 * search the list for the closest values to `nums[j]`.
 *
 * @see https://leetcode.com/problems/minimum-absolute-difference-between-elements-with-constraint/
 * @difficulty Medium
 * @timeComplexity O(n log n) comparisons, plus O(n²) element moves in the worst case
 * @spaceComplexity O(n)
 *
 * @example
 * minimumAbsoluteDifferenceBetweenElementsWithConstraint([5, 3, 2, 10, 15], 1); // 1
 */
export const minimumAbsoluteDifferenceBetweenElementsWithConstraint = (
	nums: readonly number[],
	x: number,
): number => {
	const sorted: number[] = [];
	const lowerBound = (value: number): number => {
		let low = 0;
		let high = sorted.length;
		while (low < high) {
			const mid = (low + high) >> 1;
			if ((sorted[mid] ?? 0) < value) low = mid + 1;
			else high = mid;
		}
		return low;
	};
	let best = Number.POSITIVE_INFINITY;
	for (let j = x; j < nums.length; j++) {
		const added = nums[j - x] ?? 0;
		sorted.splice(lowerBound(added), 0, added);
		const value = nums[j] ?? 0;
		const at = lowerBound(value);
		if (at < sorted.length) best = Math.min(best, (sorted[at] ?? 0) - value);
		if (at > 0) best = Math.min(best, value - (sorted[at - 1] ?? 0));
	}
	return best;
};
