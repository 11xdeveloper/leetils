/**
 * 3894. Traffic Signal Color
 *
 * The signal is "Green" at 0, "Orange" at 30 and "Red" from 31 to 90
 * seconds left; anything else is "Invalid".
 *
 * @see https://leetcode.com/problems/traffic-signal-color/
 * @difficulty Easy
 * @timeComplexity O(1)
 * @spaceComplexity O(1)
 *
 * @example
 * trafficSignalColor(60); // "Red"
 */
export const trafficSignalColor = (timer: number): string => {
	if (timer === 0) return "Green";
	if (timer === 30) return "Orange";
	if (timer > 30 && timer <= 90) return "Red";
	return "Invalid";
};
