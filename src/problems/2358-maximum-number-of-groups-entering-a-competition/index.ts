/**
 * 2358. Maximum Number of Groups Entering a Competition
 *
 * Splits students into ordered groups, each with a larger total grade and
 * more students than the one before. Returns the most groups.
 *
 * Sorting makes grades follow sizes, so only sizes matter: the most `k`
 * with `1 + 2 + … + k <= n`.
 *
 * @see https://leetcode.com/problems/maximum-number-of-groups-entering-a-competition/
 * @difficulty Medium
 * @timeComplexity O(√n)
 * @spaceComplexity O(1)
 *
 * @example
 * maximumNumberOfGroupsEnteringACompetition([10, 6, 12, 7, 3, 5]); // 3
 */
export const maximumNumberOfGroupsEnteringACompetition = (
	grades: readonly number[],
): number => {
	let groups = 0;
	while (((groups + 1) * (groups + 2)) / 2 <= grades.length) groups++;
	return groups;
};
