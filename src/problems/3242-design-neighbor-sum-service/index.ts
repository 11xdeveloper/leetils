/**
 * 3242. Design Neighbor Sum Service
 *
 * For an n × n grid holding each of 0 to n² - 1 once, `adjacentSum(value)`
 * adds up the cells above, below, left and right of `value`, and
 * `diagonalSum(value)` the four diagonal neighbours.
 *
 * Record each value's position up front, then add up its neighbours.
 *
 * @see https://leetcode.com/problems/design-neighbor-sum-service/
 * @difficulty Easy
 * @timeComplexity O(n²) to build, O(1) per query
 * @spaceComplexity O(n²)
 *
 * @example
 * const service = new DesignNeighborSumService([[0, 1, 2], [3, 4, 5], [6, 7, 8]]);
 * service.adjacentSum(4); // 16
 * service.diagonalSum(4); // 16
 */
export class DesignNeighborSumService {
	readonly #grid: readonly (readonly number[])[];
	readonly #positions: [number, number][] = [];

	constructor(grid: readonly (readonly number[])[]) {
		this.#grid = grid;
		grid.forEach((row, r) => {
			row.forEach((value, c) => {
				this.#positions[value] = [r, c];
			});
		});
	}

	adjacentSum(value: number): number {
		return this.#sum(value, [
			[-1, 0],
			[1, 0],
			[0, -1],
			[0, 1],
		]);
	}

	diagonalSum(value: number): number {
		return this.#sum(value, [
			[-1, -1],
			[-1, 1],
			[1, -1],
			[1, 1],
		]);
	}

	#sum(value: number, offsets: readonly [number, number][]): number {
		const [r, c] = this.#positions[value] ?? [0, 0];
		let total = 0;
		for (const [dr, dc] of offsets) total += this.#grid[r + dr]?.[c + dc] ?? 0;
		return total;
	}
}
