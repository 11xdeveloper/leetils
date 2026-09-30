/**
 * 1182. Shortest Distance to Target Color
 *
 * `colors` holds colours 1, 2 and 3. For each query `[i, c]`, returns the
 * distance from index `i` to the nearest index with colour `c`, or -1 if
 * there's none.
 *
 * Precomputes, for each colour and index, the distance to the nearest
 * index of that colour, with one pass from each end.
 *
 * @see https://leetcode.com/problems/shortest-distance-to-target-color/
 * @difficulty Medium
 * @timeComplexity O(n + q)
 * @spaceComplexity O(n)
 *
 * @example
 * shortestDistanceToTargetColor([1, 1, 2, 1, 3, 2, 2, 3, 3], [[1, 3], [2, 2], [6, 1]]); // [3, 0, 3]
 */
export const shortestDistanceToTargetColor = (
	colors: readonly number[],
	queries: readonly (readonly number[])[],
): number[] => {
	const n = colors.length;
	const nearest = [1, 2, 3].map((colour) => {
		const distance = new Array<number>(n).fill(Infinity);
		let last = -Infinity;
		for (let i = 0; i < n; i++) {
			if (colors[i] === colour) last = i;
			distance[i] = i - last;
		}
		last = Infinity;
		for (let i = n - 1; i >= 0; i--) {
			if (colors[i] === colour) last = i;
			distance[i] = Math.min(distance[i] ?? Infinity, last - i);
		}
		return distance;
	});
	return queries.map(([i = 0, c = 1]) => {
		const distance = nearest[c - 1]?.[i] ?? Infinity;
		return distance === Infinity ? -1 : distance;
	});
};
