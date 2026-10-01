/**
 * 1665. Minimum Initial Energy to Finish Tasks
 *
 * Each task `[actual, minimum]` needs at least `minimum` energy to start
 * and uses `actual`. Returns the least starting energy to finish every
 * task in some order.
 *
 * An exchange argument shows it is best to do tasks in decreasing order of
 * `minimum − actual` (the energy left over). Work backward through that
 * order, raising the requirement to each task's `minimum` as needed.
 *
 * @see https://leetcode.com/problems/minimum-initial-energy-to-finish-tasks/
 * @difficulty Hard
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumInitialEnergyToFinishTasks([[1, 2], [2, 4], [4, 8]]); // 8
 */
export const minimumInitialEnergyToFinishTasks = (
	tasks: readonly (readonly number[])[],
): number => {
	const order = tasks.toSorted(
		([a1 = 0, m1 = 0], [a2 = 0, m2 = 0]) => m1 - a1 - (m2 - a2),
	);
	let energy = 0;
	for (const [actual = 0, minimum = 0] of order)
		energy = Math.max(energy + actual, minimum);
	return energy;
};
