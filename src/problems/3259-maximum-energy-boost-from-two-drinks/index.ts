/**
 * 3259. Maximum Energy Boost From Two Drinks
 *
 * Each hour, drink A or B for that hour's boost, but switching drinks costs
 * an hour with no boost. Returns the most energy over all the hours.
 *
 * Track the best total ending on each drink; reaching drink A at hour i
 * either continues A or comes from B two hours back.
 *
 * @see https://leetcode.com/problems/maximum-energy-boost-from-two-drinks/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * maximumEnergyBoostFromTwoDrinks([4, 1, 1], [1, 1, 3]); // 7
 */
export const maximumEnergyBoostFromTwoDrinks = (
	energyDrinkA: readonly number[],
	energyDrinkB: readonly number[],
): number => {
	let [a, b] = [0, 0];
	let [aBefore, bBefore] = [0, 0];
	energyDrinkA.forEach((boostA, i) => {
		const nextA = Math.max(a, bBefore) + boostA;
		const nextB = Math.max(b, aBefore) + (energyDrinkB[i] ?? 0);
		[aBefore, bBefore] = [a, b];
		[a, b] = [nextA, nextB];
	});
	return Math.max(a, b);
};
