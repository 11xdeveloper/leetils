/**
 * 1936. Add Minimum Number of Rungs
 *
 * Climbing from height 0 up the strictly increasing `rungs`, each step can
 * rise at most `dist`. Returns the fewest rungs to add.
 *
 * A gap of `g` needs `⌈g / dist⌉ − 1` extra rungs.
 *
 * @see https://leetcode.com/problems/add-minimum-number-of-rungs/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * addMinimumNumberOfRungs([1, 3, 5, 10], 2); // 2
 */
export const addMinimumNumberOfRungs = (
	rungs: readonly number[],
	dist: number,
): number => {
	let [added, height] = [0, 0];
	for (const rung of rungs) {
		added += Math.ceil((rung - height) / dist) - 1;
		height = rung;
	}
	return added;
};
