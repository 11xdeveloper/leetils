/**
 * 1052. Grumpy Bookstore Owner
 *
 * In minute `i`, `customers[i]` customers visit, and they're satisfied
 * unless the owner is grumpy that minute. Once, the owner can stay calm for
 * `minutes` consecutive minutes. Returns the most satisfied customers.
 *
 * The customers satisfied anyway, plus the best window of `minutes` in
 * which the calm spell rescues the most customers from a grumpy owner, found
 * with a sliding window.
 *
 * @see https://leetcode.com/problems/grumpy-bookstore-owner/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * grumpyBookstoreOwner([1, 0, 1, 2, 1, 1, 7, 5], [0, 1, 0, 1, 0, 1, 0, 1], 3); // 16
 */
export const grumpyBookstoreOwner = (
	customers: readonly number[],
	grumpy: readonly number[],
	minutes: number,
): number => {
	let satisfied = 0;
	let rescued = 0;
	let bestRescue = 0;
	for (const [i, count] of customers.entries()) {
		if (grumpy[i] === 0) satisfied += count;
		else rescued += count;
		if (i >= minutes && grumpy[i - minutes] === 1)
			rescued -= customers[i - minutes] ?? 0;
		bestRescue = Math.max(bestRescue, rescued);
	}
	return satisfied + bestRescue;
};
