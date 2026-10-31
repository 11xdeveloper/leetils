/**
 * 2428. Maximum Sum of an Hourglass
 *
 * An hourglass is the top row, middle cell and bottom row of a 3 × 3
 * window. Returns the largest hourglass sum.
 *
 * @see https://leetcode.com/problems/maximum-sum-of-an-hourglass/
 * @difficulty Medium
 * @timeComplexity O(m · n)
 * @spaceComplexity O(1)
 *
 * @example
 * maximumSumOfAnHourglass([[6, 2, 1, 3], [4, 2, 1, 5], [9, 2, 8, 7], [4, 1, 2, 9]]); // 30
 */
export const maximumSumOfAnHourglass = (
	grid: readonly (readonly number[])[],
): number => {
	let best = 0;
	for (let r = 0; r + 2 < grid.length; r++) {
		const [top = [], middle = [], bottom = []] = [
			grid[r],
			grid[r + 1],
			grid[r + 2],
		];
		for (let c = 0; c + 2 < top.length; c++) {
			let sum = middle[c + 1] ?? 0;
			for (let k = c; k < c + 3; k++) sum += (top[k] ?? 0) + (bottom[k] ?? 0);
			best = Math.max(best, sum);
		}
	}
	return best;
};
