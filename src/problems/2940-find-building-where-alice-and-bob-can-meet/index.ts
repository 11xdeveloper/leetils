/**
 * 2940. Find Building Where Alice and Bob Can Meet
 *
 * From building `i` you can move to any `j > i` that is taller. For each
 * query `[a, b]`, returns the leftmost building both can reach (staying
 * put counts), or -1.
 *
 * If one can reach the other, that's the answer. Otherwise they need a
 * building past both and taller than both. Answer those queries by
 * decreasing position, adding buildings from the right to a stack of
 * rising heights, and binary search it for the nearest tall enough.
 *
 * @see https://leetcode.com/problems/find-building-where-alice-and-bob-can-meet/
 * @difficulty Hard
 * @timeComplexity O((n + q) log(n + q))
 * @spaceComplexity O(n + q)
 *
 * @example
 * findBuildingWhereAliceAndBobCanMeet([6, 4, 8, 5, 2, 7], [[0, 1], [0, 3], [2, 4], [3, 4], [2, 2]]); // [2, 5, -1, 5, 2]
 */
export const findBuildingWhereAliceAndBobCanMeet = (
	heights: readonly number[],
	queries: readonly (readonly number[])[],
): number[] => {
	const answer = queries.map(() => -1);
	const pending: [after: number, height: number, query: number][] = [];
	for (const [q, [x = 0, y = 0]] of queries.entries()) {
		const a = Math.min(x, y);
		const b = Math.max(x, y);
		if (a === b || (heights[a] ?? 0) < (heights[b] ?? 0)) answer[q] = b;
		else pending.push([b, Math.max(heights[a] ?? 0, heights[b] ?? 0), q]);
	}
	pending.sort((p, r) => r[0] - p[0]);

	// Indices from the right; heights strictly fall from bottom to top.
	const stack: number[] = [];
	let next = heights.length - 1;
	for (const [after, height, q] of pending) {
		for (; next > after; next--) {
			const h = heights[next] ?? 0;
			while (stack.length > 0 && (heights[stack.at(-1) ?? 0] ?? 0) <= h)
				stack.pop();
			stack.push(next);
		}
		// The topmost (nearest) building taller than `height`.
		let low = 0;
		let high = stack.length;
		while (low < high) {
			const mid = (low + high) >> 1;
			if ((heights[stack[mid] ?? 0] ?? 0) > height) low = mid + 1;
			else high = mid;
		}
		answer[q] = low > 0 ? (stack[low - 1] ?? -1) : -1;
	}
	return answer;
};
