/**
 * 3380. Maximum Area Rectangle With Point Constraints I
 *
 * The largest area of an axis-aligned rectangle with four of the points as
 * corners and no other point inside it or on its border, or -1.
 *
 * Sweep the columns of points left to right. In a valid rectangle, each
 * side's two corners are neighbours in their column, so record each
 * neighbouring pair (y₁, y₂) with the column it was last seen in. When the
 * pair shows up again, the earlier column is the only possible partner,
 * and a Fenwick tree over y counting the points swept so far tells whether
 * anything lies between them.
 *
 * @see https://leetcode.com/problems/maximum-area-rectangle-with-point-constraints-i/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * maximumAreaRectangleWithPointConstraintsI([[1, 1], [1, 3], [3, 1], [3, 3]]); // 4
 */
export const maximumAreaRectangleWithPointConstraintsI = (
	points: readonly (readonly number[])[],
): number => {
	const xs = points.map((p) => p[0] ?? 0);
	const ys = points.map((p) => p[1] ?? 0);
	const values = [...new Set(ys)].sort((a, b) => a - b);
	const rank = new Map(values.map((value, i) => [value, i + 1]));
	const tree = new Int32Array(values.length + 1);
	const add = (y: number): void => {
		for (let i = rank.get(y) ?? 0; i <= values.length; i += i & -i)
			tree[i] = (tree[i] ?? 0) + 1;
	};
	/** Points swept so far with y-rank up to `r`. */
	const upTo = (r: number): number => {
		let count = 0;
		for (let i = r; i > 0; i -= i & -i) count += tree[i] ?? 0;
		return count;
	};
	const between = (low: number, high: number): number =>
		upTo(rank.get(high) ?? 0) - upTo((rank.get(low) ?? 1) - 1);
	const columns = new Map<number, number[]>();
	xs.forEach((x, i) => {
		const column = columns.get(x) ?? [];
		column.push(ys[i] ?? 0);
		columns.set(x, column);
	});
	const seen = new Map<string, [x: number, count: number]>();
	let best = -1;
	for (const x of [...columns.keys()].sort((a, b) => a - b)) {
		const column = (columns.get(x) ?? []).sort((a, b) => a - b);
		const pairs: [number, number, string][] = [];
		for (let i = 1; i < column.length; i++) {
			const [low = 0, high = 0] = [column[i - 1], column[i]];
			pairs.push([low, high, `${low},${high}`]);
		}
		for (const [low, high, key] of pairs) {
			const previous = seen.get(key);
			if (previous && between(low, high) === previous[1])
				best = Math.max(best, (x - previous[0]) * (high - low));
		}
		for (const y of column) add(y);
		for (const [low, high, key] of pairs)
			seen.set(key, [x, between(low, high)]);
	}
	return best;
};
