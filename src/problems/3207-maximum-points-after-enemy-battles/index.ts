/**
 * 3207. Maximum Points After Enemy Battles
 *
 * With `currentEnergy`, you can fight an unmarked enemy whose energy you
 * can afford, losing that much energy for a point, or (once you have a
 * point) mark an unmarked enemy to absorb its energy. Returns the most
 * points possible.
 *
 * Absorb every enemy except the weakest, and spend everything fighting the
 * weakest over and over. That's impossible only if you can't afford even
 * the weakest at the start.
 *
 * @see https://leetcode.com/problems/maximum-points-after-enemy-battles/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * maximumPointsAfterEnemyBattles([3, 2, 2], 2); // 3
 */
export const maximumPointsAfterEnemyBattles = (
	enemyEnergies: readonly number[],
	currentEnergy: number,
): number => {
	const weakest = Math.min(...enemyEnergies);
	if (currentEnergy < weakest) return 0;
	const total = enemyEnergies.reduce((a, b) => a + b, 0);
	return Math.floor((currentEnergy + total - weakest) / weakest);
};
