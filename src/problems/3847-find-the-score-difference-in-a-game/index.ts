/**
 * 3847. Find the Score Difference in a Game
 *
 * Two players alternate being active: before each game the roles swap if
 * its points are odd, and again on every sixth game; the active player
 * scores it. Returns the first player's total minus the second's.
 *
 * @see https://leetcode.com/problems/find-the-score-difference-in-a-game/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * findTheScoreDifferenceInAGame([2, 4, 2, 1, 2, 1]); // 4
 */
export const findTheScoreDifferenceInAGame = (
	nums: readonly number[],
): number => {
	let firstActive = true;
	let difference = 0;
	nums.forEach((points, i) => {
		if (points % 2 === 1) firstActive = !firstActive;
		if (i % 6 === 5) firstActive = !firstActive;
		difference += firstActive ? points : -points;
	});
	return difference;
};
