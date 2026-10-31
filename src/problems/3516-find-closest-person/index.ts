/**
 * 3516. Find Closest Person
 *
 * Person 1 at `x` and person 2 at `y` race to `z` at the same speed.
 * Returns which arrives first, or 0 for a tie.
 *
 * Compare the distances.
 *
 * @see https://leetcode.com/problems/find-closest-person/
 * @difficulty Easy
 * @timeComplexity O(1)
 * @spaceComplexity O(1)
 *
 * @example
 * findClosestPerson(2, 7, 4); // 1
 */
export const findClosestPerson = (x: number, y: number, z: number): number => {
	const a = Math.abs(x - z);
	const b = Math.abs(y - z);
	return a < b ? 1 : a > b ? 2 : 0;
};
