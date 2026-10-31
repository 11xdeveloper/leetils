/**
 * 2735. Collecting Chocolates
 *
 * Collecting the chocolate at index `i` costs `nums[i]`; an operation
 * costing `x` shifts every chocolate's type along by one. Returns the
 * cheapest way to collect one chocolate of every type.
 *
 * With `k` operations, each type can be bought at the cheapest of the
 * `k + 1` positions it passes through. Try every `k`, keeping each type's
 * running minimum.
 *
 * @see https://leetcode.com/problems/collecting-chocolates/
 * @difficulty Medium
 * @timeComplexity O(n²)
 * @spaceComplexity O(n)
 *
 * @example
 * collectingChocolates([20, 1, 15], 5); // 13
 */
export const collectingChocolates = (
	nums: readonly number[],
	x: number,
): number => {
	const n = nums.length;
	const cheapest = [...nums];
	let best = cheapest.reduce((sum, c) => sum + c, 0);
	for (let k = 1; k < n; k++) {
		let total = k * x;
		for (let i = 0; i < n; i++) {
			cheapest[i] = Math.min(cheapest[i] ?? 0, nums[(i + k) % n] ?? 0);
			total += cheapest[i] ?? 0;
		}
		best = Math.min(best, total);
	}
	return best;
};
