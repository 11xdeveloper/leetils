/**
 * 4055. Count Shadow Pairs II
 *
 * Counts pairs i < j with `nums[i] < nums[j]` and no k between them with
 * a value strictly between theirs.
 *
 * As points (index, value), these are pairs bounding an empty rectangle
 * from its lower-left to upper-right corner. Divide and conquer on index:
 * for pairs across the middle, sweep by value. Left points stay usable
 * until a later left point to their right rises past them (a staircase
 * stack); a right point is blocked below by the highest earlier right
 * point to its left (another stack), so it pairs with the usable left
 * points at least that high.
 *
 * @see https://leetcode.com/problems/count-shadow-pairs-ii/
 * @difficulty Hard
 * @timeComplexity O(n log² n)
 * @spaceComplexity O(n)
 *
 * @example
 * countShadowPairsII([3, 1, 4, 2, 5]); // 5
 */
export const countShadowPairsII = (nums: readonly number[]): number => {
	const solve = (lo: number, hi: number): number => {
		if (hi - lo < 2) return 0;
		const mid = (lo + hi) >>> 1;
		let count = solve(lo, mid) + solve(mid, hi);
		const order = Array.from({ length: hi - lo }, (_, k) => lo + k).sort(
			(a, b) => (nums[a] ?? 0) - (nums[b] ?? 0),
		);
		// usable: left points, values rising and indices falling towards the top.
		const usable: number[] = [];
		// blockers: right points, indices and values rising towards the top.
		const blockers: number[] = [];
		for (let g = 0; g < order.length; ) {
			const value = nums[order[g] ?? 0] ?? 0;
			let end = g;
			while (end < order.length && nums[order[end] ?? 0] === value) end++;
			const group = order.slice(g, end);
			// Pair this value's right points first: equal values never pair or block.
			for (const q of group) {
				if (q < mid) continue;
				let [a, b] = [0, blockers.length];
				while (a < b) {
					const m = (a + b) >>> 1;
					if ((blockers[m] ?? 0) < q) a = m + 1;
					else b = m;
				}
				const floor =
					a > 0 ? (nums[blockers[a - 1] ?? 0] ?? 0) : Number.NEGATIVE_INFINITY;
				[a, b] = [0, usable.length];
				while (a < b) {
					const m = (a + b) >>> 1;
					if ((nums[usable[m] ?? 0] ?? 0) < floor) a = m + 1;
					else b = m;
				}
				count += usable.length - a;
			}
			const lefts = group.filter((p) => p < mid);
			const widest = Math.max(...lefts, Number.NEGATIVE_INFINITY);
			while (usable.length > 0 && (usable.at(-1) ?? 0) < widest) usable.pop();
			for (const p of lefts.sort((x, y) => y - x)) usable.push(p);
			for (const q of group.filter((r) => r >= mid).sort((x, y) => x - y)) {
				while (blockers.length > 0 && (blockers.at(-1) ?? 0) > q)
					blockers.pop();
				blockers.push(q);
			}
			g = end;
		}
		return count;
	};
	return solve(0, nums.length);
};
