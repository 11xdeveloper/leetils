/**
 * 4025. Minimize the Maximum Waiting Time at Synchronized Traffic Lights
 *
 * Lights share a cycle of `period` seconds, each green for its first
 * `lights[i]` seconds. A car arriving at r (mod period) waits 0 at a
 * green light, else until the cycle restarts. Assigning each car a light,
 * returns the smallest possible longest wait.
 *
 * Cars don't interact, so each takes the light that stays green longest.
 *
 * @see https://leetcode.com/problems/minimize-the-maximum-waiting-time-at-synchronized-traffic-lights/
 * @difficulty Medium
 * @timeComplexity O(n + m)
 * @spaceComplexity O(1)
 *
 * @example
 * minimizeTheMaximumWaitingTimeAtSynchronizedTrafficLights(8, [2, 3], [2, 5, 8, 11]); // 5
 */
export const minimizeTheMaximumWaitingTimeAtSynchronizedTrafficLights = (
	period: number,
	lights: readonly number[],
	arrivalTime: readonly number[],
): number => {
	const green = Math.max(...lights);
	let worst = 0;
	for (const t of arrivalTime) {
		const r = t % period;
		if (r >= green) worst = Math.max(worst, period - r);
	}
	return worst;
};
