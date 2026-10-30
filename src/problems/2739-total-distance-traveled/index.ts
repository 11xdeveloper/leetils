/**
 * 2739. Total Distance Traveled
 *
 * A truck covers 10 km per litre. Every time 5 litres are used from the
 * main tank, 1 litre moves across from the additional tank if it has
 * any. Returns the total distance.
 *
 * Each transfer needs 4 net litres of the main tank's own fuel first,
 * plus one left to trigger it.
 *
 * @see https://leetcode.com/problems/total-distance-traveled/
 * @difficulty Easy
 * @timeComplexity O(1)
 * @spaceComplexity O(1)
 *
 * @example
 * totalDistanceTraveled(5, 10); // 60
 */
export const totalDistanceTraveled = (
	mainTank: number,
	additionalTank: number,
): number =>
	10 * (mainTank + Math.min(additionalTank, Math.floor((mainTank - 1) / 4)));
