import { Heap } from "../../internal/heap";

/**
 * 407. Trapping Rain Water II
 *
 * Given a height map of unit cells, returns how much rain water it holds
 * after raining.
 *
 * Water drains from the outside in, so the lowest point of the boundary
 * decides the level near it. A min-heap starts with the boundary cells and
 * always expands from its lowest cell: a lower neighbour fills with water up
 * to that level, and every neighbour then joins the boundary at its new
 * height, like Dijkstra's algorithm.
 *
 * @see https://leetcode.com/problems/trapping-rain-water-ii/
 * @difficulty Hard
 * @timeComplexity O(m n log(m n))
 * @spaceComplexity O(m * n)
 *
 * @example
 * trappingRainWaterII([[1, 4, 3, 1, 3, 2], [3, 2, 1, 3, 2, 4], [2, 3, 3, 2, 3, 1]]); // 4
 */
export const trappingRainWaterII = (
	heightMap: readonly (readonly number[])[],
): number => {
	const rows = heightMap.length;
	const columns = heightMap[0]?.length ?? 0;
	const visited = new Uint8Array(rows * columns);
	const boundary = new Heap<[level: number, row: number, column: number]>(
		(a, b) => a[0] - b[0],
	);

	for (let r = 0; r < rows; r++) {
		for (let c = 0; c < columns; c++) {
			if (r === 0 || c === 0 || r === rows - 1 || c === columns - 1) {
				boundary.push([heightMap[r]?.[c] ?? 0, r, c]);
				visited[r * columns + c] = 1;
			}
		}
	}

	let water = 0;
	while (boundary.size > 0) {
		const [level, r, c] = boundary.pop() ?? [0, 0, 0];
		for (const [nr, nc] of [
			[r + 1, c],
			[r - 1, c],
			[r, c + 1],
			[r, c - 1],
		] as const) {
			if (
				nr < 0 ||
				nr >= rows ||
				nc < 0 ||
				nc >= columns ||
				visited[nr * columns + nc] === 1
			)
				continue;
			visited[nr * columns + nc] = 1;
			const height = heightMap[nr]?.[nc] ?? 0;
			water += Math.max(0, level - height);
			boundary.push([Math.max(level, height), nr, nc]);
		}
	}

	return water;
};
