/**
 * 2813. Maximum Elegance of a K-Length Subsequence
 *
 * Choosing `k` items `[profit, category]` scores their total profit plus
 * the square of the number of distinct categories. Returns the largest
 * score.
 *
 * Start with the `k` most profitable items. Then consider the rest by
 * falling profit, each from a new category, swapping it in for the least
 * profitable duplicate already chosen, and keep the best score seen.
 *
 * @see https://leetcode.com/problems/maximum-elegance-of-a-k-length-subsequence/
 * @difficulty Hard
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * maximumEleganceOfAKLengthSubsequence([[3, 1], [3, 1], [2, 2], [5, 3]], 3); // 19
 */
export const maximumEleganceOfAKLengthSubsequence = (
	items: readonly (readonly number[])[],
	k: number,
): number => {
	const sorted = items.toSorted((a, b) => (b[0] ?? 0) - (a[0] ?? 0));
	const categories = new Set<number>();
	const duplicates: number[] = [];
	let profit = 0;
	for (const [p = 0, category = 0] of sorted.slice(0, k)) {
		profit += p;
		if (categories.has(category)) duplicates.push(p);
		else categories.add(category);
	}
	let best = profit + categories.size ** 2;
	for (const [p = 0, category = 0] of sorted.slice(k)) {
		if (categories.has(category) || duplicates.length === 0) continue;
		profit += p - (duplicates.pop() ?? 0);
		categories.add(category);
		best = Math.max(best, profit + categories.size ** 2);
	}
	return best;
};
