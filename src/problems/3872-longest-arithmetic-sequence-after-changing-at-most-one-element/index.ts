/**
 * 3872. Longest Arithmetic Sequence After Changing At Most One Element
 *
 * After replacing at most one element with any integer, returns the
 * longest subarray with a constant difference between neighbours.
 *
 * Any arithmetic run can grow by one by changing a neighbour. Replacing
 * an inner element i with the midpoint of its neighbours (when their gap
 * is even) joins the run ending at i - 1 and the run starting at i + 1,
 * each counted fully only if its difference matches half the gap.
 *
 * @see https://leetcode.com/problems/longest-arithmetic-sequence-after-changing-at-most-one-element/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * longestArithmeticSequenceAfterChangingAtMostOneElement([9, 7, 5, 10, 1]); // 5
 */
export const longestArithmeticSequenceAfterChangingAtMostOneElement = (
	nums: readonly number[],
): number => {
	const n = nums.length;
	const gap = (i: number) => (nums[i + 1] ?? 0) - (nums[i] ?? 0);
	// ending[i]/starting[i]: elements in the longest arithmetic run ending/starting at i.
	const ending = new Array<number>(n).fill(1);
	const starting = new Array<number>(n).fill(1);
	for (let i = 1; i < n; i++)
		ending[i] =
			i >= 2 && gap(i - 2) === gap(i - 1) ? (ending[i - 1] ?? 0) + 1 : 2;
	for (let i = n - 2; i >= 0; i--)
		starting[i] =
			i + 2 < n && gap(i) === gap(i + 1) ? (starting[i + 1] ?? 0) + 1 : 2;
	let best = Math.min(n, Math.max(...ending) + 1);
	for (let i = 1; i + 1 < n; i++) {
		const span = (nums[i + 1] ?? 0) - (nums[i - 1] ?? 0);
		if (span % 2 !== 0) continue;
		const step = span / 2;
		const left = i >= 2 && gap(i - 2) === step ? (ending[i - 1] ?? 0) : 1;
		const right = i + 2 < n && gap(i + 1) === step ? (starting[i + 1] ?? 0) : 1;
		best = Math.max(best, left + 1 + right);
	}
	return best;
};
