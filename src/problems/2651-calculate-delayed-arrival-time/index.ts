/**
 * 2651. Calculate Delayed Arrival Time
 *
 * Returns the hour, on a 24-hour clock, a train due at `arrivalTime`
 * arrives after a delay of `delayedTime` hours.
 *
 * Add and wrap around the day.
 *
 * @see https://leetcode.com/problems/calculate-delayed-arrival-time/
 * @difficulty Easy
 * @timeComplexity O(1)
 * @spaceComplexity O(1)
 *
 * @example
 * calculateDelayedArrivalTime(13, 11); // 0
 */
export const calculateDelayedArrivalTime = (
	arrivalTime: number,
	delayedTime: number,
): number => (arrivalTime + delayedTime) % 24;
