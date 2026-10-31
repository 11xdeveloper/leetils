/**
 * 3041. Maximize Consecutive Elements in an Array After Modification
 *
 * After increasing any elements of `nums` by at most 1, select as many
 * elements as possible that sort into consecutive values. Returns how many.
 *
 * Go through the sorted values, keeping the longest run ending at each
 * value. An element can extend the run ending just below it (unchanged) or
 * the run ending at its own value (raised by 1); update the raised case
 * first so the element isn't used twice.
 *
 * @see https://leetcode.com/problems/maximize-consecutive-elements-in-an-array-after-modification/
 * @difficulty Hard
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * maximizeConsecutiveElementsInAnArrayAfterModification([2, 1, 5, 1, 1]); // 3
 */
export const maximizeConsecutiveElementsInAnArrayAfterModification = (
	nums: readonly number[],
): number => {
	const runs = new Map<number, number>();
	let best = 0;
	for (const num of nums.toSorted((a, b) => a - b)) {
		const raised = (runs.get(num) ?? 0) + 1;
		const kept = (runs.get(num - 1) ?? 0) + 1;
		runs.set(num + 1, Math.max(runs.get(num + 1) ?? 0, raised));
		runs.set(num, Math.max(runs.get(num) ?? 0, kept));
		best = Math.max(best, raised, kept);
	}
	return best;
};
