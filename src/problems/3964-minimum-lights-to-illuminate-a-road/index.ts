/**
 * 3964. Minimum Lights to Illuminate a Road
 *
 * A bulb of strength v at i lights positions i - v to i + v. Returns the
 * fewest extra bulbs (each lighting itself and its neighbours) needed to
 * light the whole road.
 *
 * Mark what the existing bulbs light with a difference array, then sweep:
 * at the first dark position, put a bulb just to its right.
 *
 * @see https://leetcode.com/problems/minimum-lights-to-illuminate-a-road/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumLightsToIlluminateARoad([0, 0, 0, 2, 0]); // 1
 */
export const minimumLightsToIlluminateARoad = (
	lights: readonly number[],
): number => {
	const n = lights.length;
	const change = new Int32Array(n + 1);
	lights.forEach((v, i) => {
		if (v === 0) return;
		change[Math.max(0, i - v)] = (change[Math.max(0, i - v)] ?? 0) + 1;
		change[Math.min(n, i + v + 1)] = (change[Math.min(n, i + v + 1)] ?? 0) - 1;
	});
	let [lit, added, coveredUntil] = [0, 0, -1];
	for (let i = 0; i < n; i++) {
		lit += change[i] ?? 0;
		if (lit > 0 || i <= coveredUntil) continue;
		added++;
		coveredUntil = i + 2;
	}
	return added;
};
