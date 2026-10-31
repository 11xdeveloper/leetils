/**
 * 4024. Nearest Available Drone
 *
 * Among drones whose range covers the Manhattan distance to `target`,
 * returns the index of the nearest (the first on ties), or -1.
 *
 * @see https://leetcode.com/problems/nearest-available-drone/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * nearestAvailableDrone([[2, 1, 5], [4, 4, 5], [6, 6, 8]], [5, 5]); // 1
 */
export const nearestAvailableDrone = (
	drones: readonly (readonly number[])[],
	target: readonly number[],
): number => {
	const [tx = 0, ty = 0] = target;
	let [best, closest] = [-1, Number.POSITIVE_INFINITY];
	drones.forEach(([x = 0, y = 0, range = 0], i) => {
		const distance = Math.abs(x - tx) + Math.abs(y - ty);
		if (distance <= range && distance < closest)
			[best, closest] = [i, distance];
	});
	return best;
};
