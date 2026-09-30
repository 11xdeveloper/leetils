/**
 * 1344. Angle Between Hands of a Clock
 *
 * Returns the smaller angle, in degrees, between the hour and minute hands
 * at `hour:minutes`.
 *
 * The minute hand moves 6° a minute; the hour hand moves 30° an hour plus
 * 0.5° a minute. The smaller angle is the difference or 360° minus it.
 *
 * @see https://leetcode.com/problems/angle-between-hands-of-a-clock/
 * @difficulty Medium
 * @timeComplexity O(1)
 * @spaceComplexity O(1)
 *
 * @example
 * angleBetweenHandsOfAClock(3, 15); // 7.5
 */
export const angleBetweenHandsOfAClock = (
	hour: number,
	minutes: number,
): number => {
	const difference = Math.abs(30 * (hour % 12) + 0.5 * minutes - 6 * minutes);
	return Math.min(difference, 360 - difference);
};
