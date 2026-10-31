/**
 * 2274. Maximum Consecutive Floors Without Special Floors
 *
 * Returns the longest run of floors from `bottom` to `top` containing no
 * special floor.
 *
 * Sort the special floors and measure the gaps, including both ends.
 *
 * @see https://leetcode.com/problems/maximum-consecutive-floors-without-special-floors/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * maximumConsecutiveFloorsWithoutSpecialFloors(2, 9, [4, 6]); // 3
 */
export const maximumConsecutiveFloorsWithoutSpecialFloors = (
	bottom: number,
	top: number,
	special: readonly number[],
): number => {
	const floors = [bottom - 1, ...special.toSorted((a, b) => a - b), top + 1];
	let best = 0;
	for (let i = 1; i < floors.length; i++)
		best = Math.max(best, (floors[i] ?? 0) - (floors[i - 1] ?? 0) - 1);
	return best;
};
