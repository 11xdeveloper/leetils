/**
 * 2768. Number of Black Blocks
 *
 * On an `m × n` grid with the given cells black, returns how many 2 × 2
 * blocks contain exactly 0, 1, 2, 3 and 4 black cells.
 *
 * Only blocks touching a black cell are non-zero; count each black
 * cell's up to four blocks in a map, and the rest have none.
 *
 * @see https://leetcode.com/problems/number-of-black-blocks/
 * @difficulty Medium
 * @timeComplexity O(b)
 * @spaceComplexity O(b)
 *
 * @example
 * numberOfBlackBlocks(3, 3, [[0, 0], [1, 1], [0, 2]]); // [0, 2, 2, 0, 0]
 */
export const numberOfBlackBlocks = (
	m: number,
	n: number,
	coordinates: readonly (readonly number[])[],
): number[] => {
	const blocks = new Map<number, number>();
	for (const [x = 0, y = 0] of coordinates)
		for (const r of [x - 1, x])
			for (const c of [y - 1, y])
				if (r >= 0 && c >= 0 && r < m - 1 && c < n - 1) {
					const key = r * n + c;
					blocks.set(key, (blocks.get(key) ?? 0) + 1);
				}
	const counts = [(m - 1) * (n - 1) - blocks.size, 0, 0, 0, 0];
	for (const black of blocks.values()) counts[black] = (counts[black] ?? 0) + 1;
	return counts;
};
