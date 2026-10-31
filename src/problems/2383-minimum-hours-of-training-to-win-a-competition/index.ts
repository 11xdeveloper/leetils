/**
 * 2383. Minimum Hours of Training to Win a Competition
 *
 * Beating opponent `i` needs strictly more energy and experience than
 * theirs; it costs `energy[i]` energy and gains `experience[i]`
 * experience. Each training hour adds one energy or experience. Returns
 * the fewest hours to beat everyone in order.
 *
 * Energy needs to exceed the total; experience is topped up whenever it
 * falls short.
 *
 * @see https://leetcode.com/problems/minimum-hours-of-training-to-win-a-competition/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * minimumHoursOfTrainingToWinACompetition(5, 3, [1, 4, 3, 2], [2, 6, 3, 1]); // 8
 */
export const minimumHoursOfTrainingToWinACompetition = (
	initialEnergy: number,
	initialExperience: number,
	energy: readonly number[],
	experience: readonly number[],
): number => {
	const totalEnergy = energy.reduce((sum, e) => sum + e, 0);
	let hours = Math.max(0, totalEnergy + 1 - initialEnergy);
	let current = initialExperience;
	for (const needed of experience) {
		if (current <= needed) {
			hours += needed + 1 - current;
			current = needed + 1;
		}
		current += needed;
	}
	return hours;
};
