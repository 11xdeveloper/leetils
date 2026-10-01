/**
 * 1732. Find the Highest Altitude
 *
 * A biker starts at altitude 0 and changes altitude by each `gain[i]`.
 * Returns the highest altitude reached.
 *
 * Running sum and its maximum.
 *
 * @see https://leetcode.com/problems/find-the-highest-altitude/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * findTheHighestAltitude([-5, 1, 5, 0, -7]); // 1
 */
export const findTheHighestAltitude = (gain: readonly number[]): number => {
	let [altitude, highest] = [0, 0];
	for (const change of gain) {
		altitude += change;
		highest = Math.max(highest, altitude);
	}
	return highest;
};
