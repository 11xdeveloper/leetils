/**
 * 3648. Minimum Sensors to Cover Grid
 *
 * A sensor covers every cell within Chebyshev distance `k`, a
 * (2k + 1) × (2k + 1) square. Returns the fewest sensors covering an
 * n × m grid.
 *
 * Tile the grid with those squares.
 *
 * @see https://leetcode.com/problems/minimum-sensors-to-cover-grid/
 * @difficulty Medium
 * @timeComplexity O(1)
 * @spaceComplexity O(1)
 *
 * @example
 * minimumSensorsToCoverGrid(5, 5, 1); // 4
 */
export const minimumSensorsToCoverGrid = (
	n: number,
	m: number,
	k: number,
): number => Math.ceil(n / (2 * k + 1)) * Math.ceil(m / (2 * k + 1));
