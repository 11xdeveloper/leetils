/**
 * 4007. Widest Possible Fence
 *
 * Build a fence of equal-height planks, each an original plank or two
 * original planks joined (heights adding up). Returns the most planks the
 * fence can have.
 *
 * For a height T, use every plank of height T alone and pair up values
 * v and T - v as often as their counts allow. Add up those pair counts for
 * every pair of distinct heights at once, keyed by their sum.
 *
 * @see https://leetcode.com/problems/widest-possible-fence/
 * @difficulty Hard
 * @timeComplexity O(n²)
 * @spaceComplexity O(n²)
 *
 * @example
 * widestPossibleFence([1, 3, 2, 5, 7, 5, 4, 2, 1]); // 4
 */
export const widestPossibleFence = (planks: readonly number[]): number => {
	const counts = new Map<number, number>();
	for (const h of planks) counts.set(h, (counts.get(h) ?? 0) + 1);
	const heights = [...counts.keys()];
	const pairs = new Map<number, number>();
	heights.forEach((v, i) => {
		const cv = counts.get(v) ?? 0;
		if (cv >= 2) pairs.set(2 * v, (pairs.get(2 * v) ?? 0) + Math.floor(cv / 2));
		for (let j = i + 1; j < heights.length; j++) {
			const w = heights[j] ?? 0;
			pairs.set(
				v + w,
				(pairs.get(v + w) ?? 0) + Math.min(cv, counts.get(w) ?? 0),
			);
		}
	});
	let best = 0;
	for (const [height, count] of counts)
		best = Math.max(best, count + (pairs.get(height) ?? 0));
	for (const [height, count] of pairs)
		best = Math.max(best, count + (counts.get(height) ?? 0));
	return best;
};
