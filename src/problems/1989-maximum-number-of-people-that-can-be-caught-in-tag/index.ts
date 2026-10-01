/**
 * 1989. Maximum Number of People That Can Be Caught in Tag
 *
 * Each person who is "it" (1) can catch one person who isn't (0) within
 * `dist` places. Returns the most people caught.
 *
 * Greedy with two pointers: each catcher, left to right, takes the
 * leftmost uncaught person still in range.
 *
 * @see https://leetcode.com/problems/maximum-number-of-people-that-can-be-caught-in-tag/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * maximumNumberOfPeopleThatCanBeCaughtInTag([0, 1, 0, 1, 0], 3); // 2
 */
export const maximumNumberOfPeopleThatCanBeCaughtInTag = (
	team: readonly number[],
	dist: number,
): number => {
	let [caught, runner] = [0, 0];
	for (const [catcher, member] of team.entries()) {
		if (member !== 1) continue;
		runner = Math.max(runner, catcher - dist);
		while (
			runner < team.length &&
			runner <= catcher + dist &&
			team[runner] !== 0
		)
			runner++;
		if (runner < team.length && runner <= catcher + dist) {
			caught++;
			runner++;
		}
	}
	return caught;
};
