/**
 * 2214. Minimum Health to Beat Game
 *
 * Levels deal `damage[i]` in order, and once you may use armour to block
 * up to `armor` of one level's damage. Health must stay above 0. Returns
 * the least starting health.
 *
 * Use the armour on the biggest hit.
 *
 * @see https://leetcode.com/problems/minimum-health-to-beat-game/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * minimumHealthToBeatGame([2, 7, 4, 3], 4); // 13
 */
export const minimumHealthToBeatGame = (
	damage: readonly number[],
	armor: number,
): number => {
	const total = damage.reduce((sum, d) => sum + d, 0);
	return total - Math.min(Math.max(...damage), armor) + 1;
};
