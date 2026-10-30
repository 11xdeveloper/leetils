/**
 * 2146. K Highest Ranked Items Within a Price Range
 *
 * In `grid`, 0 is a wall, 1 an empty cell, and larger values priced
 * items. Returns the positions of the `k` best-ranked reachable items
 * priced within `pricing` — ranked by distance from `start`, then price,
 * row and column.
 *
 * Breadth-first search for distances, then sort the qualifying items.
 *
 * @see https://leetcode.com/problems/k-highest-ranked-items-within-a-price-range/
 * @difficulty Medium
 * @timeComplexity O(m · n log(m · n))
 * @spaceComplexity O(m · n)
 *
 * @example
 * kHighestRankedItemsWithinAPriceRange([[1, 2, 0, 1], [1, 3, 0, 1], [0, 2, 5, 1]], [2, 5], [0, 0], 3); // [[0, 1], [1, 1], [2, 1]]
 */
export const kHighestRankedItemsWithinAPriceRange = (
	grid: readonly (readonly number[])[],
	pricing: readonly number[],
	start: readonly number[],
	k: number,
): number[][] => {
	const [low = 0, high = 0] = pricing;
	const [startRow = 0, startCol = 0] = start;
	const cols = grid[0]?.length ?? 0;
	const seen = new Set([startRow * cols + startCol]);
	const items: [distance: number, price: number, row: number, col: number][] =
		[];
	let level: [number, number][] = [[startRow, startCol]];
	for (let distance = 0; level.length; distance++) {
		const next: [number, number][] = [];
		for (const [row, col] of level) {
			const price = grid[row]?.[col] ?? 0;
			if (price >= low && price <= high)
				items.push([distance, price, row, col]);
			for (const [nr, nc] of [
				[row - 1, col],
				[row + 1, col],
				[row, col - 1],
				[row, col + 1],
			] as const) {
				if (!grid[nr]?.[nc]) continue;
				if (seen.has(nr * cols + nc)) continue;
				seen.add(nr * cols + nc);
				next.push([nr, nc]);
			}
		}
		level = next;
	}
	return items
		.sort((a, b) => a[0] - b[0] || a[1] - b[1] || a[2] - b[2] || a[3] - b[3])
		.slice(0, k)
		.map(([, , row, col]) => [row, col]);
};
