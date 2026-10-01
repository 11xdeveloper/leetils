/**
 * 1953. Maximum Number of Weeks for Which You Can Work
 *
 * Each week finishes one milestone of some project, never the same project
 * two weeks running. Returns the most weeks of work.
 *
 * Everything fits unless the largest project outnumbers all the others
 * plus one; then it can only interleave with them.
 *
 * @see https://leetcode.com/problems/maximum-number-of-weeks-for-which-you-can-work/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * maximumNumberOfWeeksForWhichYouCanWork([5, 2, 1]); // 7
 */
export const maximumNumberOfWeeksForWhichYouCanWork = (
	milestones: readonly number[],
): number => {
	const total = milestones.reduce((sum, count) => sum + count, 0);
	const rest = total - Math.max(...milestones);
	return Math.max(...milestones) > rest + 1 ? 2 * rest + 1 : total;
};
