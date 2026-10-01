/**
 * 1878. Get Biggest Three Rhombus Sums in a Grid
 *
 * A rhombus sum adds the cells on the border of a square rotated 45°
 * (a single cell counts too). Returns the three largest distinct rhombus
 * sums in descending order, or fewer if there aren't three.
 *
 * Enumerate each top corner and size, walking the four edges.
 *
 * @see https://leetcode.com/problems/get-biggest-three-rhombus-sums-in-a-grid/
 * @difficulty Medium
 * @timeComplexity O(m · n · min(m, n)^2)
 * @spaceComplexity O(1)
 *
 * @example
 * getBiggestThreeRhombusSumsInAGrid([[1, 2, 3], [4, 5, 6], [7, 8, 9]]); // [20, 9, 8]
 */
export const getBiggestThreeRhombusSumsInAGrid = (
	grid: readonly (readonly number[])[],
): number[] => {
	const [m, n] = [grid.length, grid[0]?.length ?? 0];
	const sums = new Set<number>();
	const cell = (r: number, c: number) => grid[r]?.[c] ?? 0;
	for (let r = 0; r < m; r++) {
		for (let c = 0; c < n; c++) {
			sums.add(cell(r, c));
			for (
				let size = 1;
				r + 2 * size < m && c - size >= 0 && c + size < n;
				size++
			) {
				let sum = 0;
				for (let step = 0; step < size; step++) {
					sum += cell(r + step, c + step); // top to right
					sum += cell(r + size + step, c + size - step); // right to bottom
					sum += cell(r + 2 * size - step, c - step); // bottom to left
					sum += cell(r + size - step, c - size + step); // left to top
				}
				sums.add(sum);
			}
		}
	}
	return [...sums].sort((a, b) => b - a).slice(0, 3);
};
