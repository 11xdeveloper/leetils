/**
 * 3075. Maximize Happiness of Selected Children
 *
 * Pick `k` children one at a time; after each pick, every unpicked child's
 * happiness drops by 1, but never below 0. Returns the largest total
 * happiness of the picked children.
 *
 * Pick the happiest first: the i-th pick (from 0) has lost i, so add up
 * `max(0, happiness - i)` over the `k` largest.
 *
 * @see https://leetcode.com/problems/maximize-happiness-of-selected-children/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * maximizeHappinessOfSelectedChildren([1, 2, 3], 2); // 4
 */
export const maximizeHappinessOfSelectedChildren = (
	happiness: readonly number[],
	k: number,
): number => {
	const sorted = happiness.toSorted((a, b) => b - a);
	let total = 0;
	for (let i = 0; i < k; i++) total += Math.max(0, (sorted[i] ?? 0) - i);
	return total;
};
