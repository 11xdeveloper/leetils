/**
 * 853. Car Fleet
 *
 * Cars drive towards `target` along one lane at constant speeds, and a car
 * catching one ahead slows to its speed, forming a fleet. Returns how many
 * fleets arrive at the target.
 *
 * From the car nearest the target backwards, each car's arrival time alone
 * is compared with the fleet ahead: arriving no sooner, it joins that
 * fleet; arriving later, it leads a new one.
 *
 * @see https://leetcode.com/problems/car-fleet/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * carFleet(12, [10, 8, 0, 5, 3], [2, 4, 1, 1, 3]); // 3
 */
export const carFleet = (
	target: number,
	position: readonly number[],
	speed: readonly number[],
): number => {
	const cars = position
		.map((p, i) => [p, (target - p) / (speed[i] ?? 1)] as const)
		.sort((a, b) => b[0] - a[0]);
	let fleets = 0;
	let slowest = 0;
	for (const [, time] of cars) {
		if (time > slowest) {
			fleets++;
			slowest = time;
		}
	}
	return fleets;
};
