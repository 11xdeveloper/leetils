/**
 * 1765. Map of Highest Peak
 *
 * Assigns heights with water cells at 0 and neighbouring cells differing
 * by at most 1, maximising the highest one. Returns the heights.
 *
 * Each cell's height is its distance to the nearest water: multi-source
 * breadth-first search from every water cell.
 *
 * @see https://leetcode.com/problems/map-of-highest-peak/
 * @difficulty Medium
 * @timeComplexity O(mn)
 * @spaceComplexity O(mn)
 *
 * @example
 * mapOfHighestPeak([[0, 1], [0, 0]]); // [[1, 0], [2, 1]]
 */
export const mapOfHighestPeak = (
	isWater: readonly (readonly number[])[],
): number[][] => {
	const [rows, cols] = [isWater.length, isWater[0]?.length ?? 0];
	const height = isWater.map((row) =>
		row.map((water): number => (water === 1 ? 0 : -1)),
	);
	const queue: [number, number][] = [];
	for (let r = 0; r < rows; r++)
		for (let c = 0; c < cols; c++)
			if (isWater[r]?.[c] === 1) queue.push([r, c]);
	for (let head = 0; head < queue.length; head++) {
		const [row, col] = queue[head] ?? [0, 0];
		const current = height[row]?.[col] ?? 0;
		for (const [r, c] of [
			[row - 1, col],
			[row + 1, col],
			[row, col - 1],
			[row, col + 1],
		] as const) {
			const line = height[r];
			if (!line || line[c] !== -1) continue;
			line[c] = current + 1;
			queue.push([r, c]);
		}
	}
	return height;
};
