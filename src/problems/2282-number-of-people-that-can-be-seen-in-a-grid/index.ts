/**
 * 2282. Number of People That Can Be Seen in a Grid
 *
 * A person sees someone to their right in the same row, or below in the
 * same column, when everyone between is shorter than both. Returns how
 * many people each person sees.
 *
 * Scan each row from the right (and each column from the bottom) with a
 * stack of decreasing heights: a person sees everyone shorter they pop,
 * plus the next one at least as tall. An equal height is popped too, since
 * it is hidden from everyone further back.
 *
 * @see https://leetcode.com/problems/number-of-people-that-can-be-seen-in-a-grid/
 * @difficulty Medium
 * @timeComplexity O(m · n)
 * @spaceComplexity O(m · n)
 *
 * @example
 * numberOfPeopleThatCanBeSeenInAGrid([[3, 1, 4, 2, 5]]); // [[2, 1, 2, 1, 0]]
 */
export const numberOfPeopleThatCanBeSeenInAGrid = (
	heights: readonly (readonly number[])[],
): number[][] => {
	const [m, n] = [heights.length, heights[0]?.length ?? 0];
	const seen = heights.map((row) => row.map(() => 0));
	/** Counts, for each cell along a line, the people visible further along. */
	const scan = (cells: [number, number][]): void => {
		const stack: number[] = [];
		for (const [r, c] of cells.toReversed()) {
			const height = heights[r]?.[c] ?? 0;
			let count = 0;
			while (stack.length && (stack.at(-1) ?? 0) < height) {
				stack.pop();
				count++;
			}
			if (stack.length) count++;
			if (stack.at(-1) === height) stack.pop();
			stack.push(height);
			(seen[r] ?? [])[c] = (seen[r]?.[c] ?? 0) + count;
		}
	};
	for (let r = 0; r < m; r++)
		scan(Array.from({ length: n }, (_, c): [number, number] => [r, c]));
	for (let c = 0; c < n; c++)
		scan(Array.from({ length: m }, (_, r): [number, number] => [r, c]));
	return seen;
};
