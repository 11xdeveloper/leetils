/**
 * 2126. Destroying Asteroids
 *
 * A planet can destroy an asteroid no heavier than itself, absorbing its
 * mass. Returns whether it can destroy every asteroid in some order.
 *
 * Destroying the lightest first only ever helps.
 *
 * @see https://leetcode.com/problems/destroying-asteroids/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * destroyingAsteroids(10, [3, 9, 19, 5, 21]); // true
 */
export const destroyingAsteroids = (
	mass: number,
	asteroids: readonly number[],
): boolean => {
	for (const asteroid of asteroids.toSorted((a, b) => a - b)) {
		if (asteroid > mass) return false;
		mass += asteroid;
	}
	return true;
};
