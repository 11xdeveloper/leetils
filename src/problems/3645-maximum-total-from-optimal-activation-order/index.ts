/**
 * 3645. Maximum Total from Optimal Activation Order
 *
 * Activate elements one at a time, each only while fewer than its `limit`
 * are active, gaining its `value`. Whenever x elements are active, every
 * element with limit at most x is deactivated for good. Returns the most
 * value gained.
 *
 * Activating in increasing order of limit, at most L elements with limit L
 * can ever be taken, and that many can: so take the L most valuable of
 * each limit.
 *
 * @see https://leetcode.com/problems/maximum-total-from-optimal-activation-order/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * maximumTotalFromOptimalActivationOrder([3, 5, 8], [2, 1, 3]); // 16
 */
export const maximumTotalFromOptimalActivationOrder = (
	value: readonly number[],
	limit: readonly number[],
): number => {
	const byLimit = new Map<number, number[]>();
	limit.forEach((l, i) => {
		const list = byLimit.get(l) ?? [];
		list.push(value[i] ?? 0);
		byLimit.set(l, list);
	});
	let total = 0;
	for (const [l, list] of byLimit)
		for (const v of list.sort((a, b) => b - a).slice(0, l)) total += v;
	return total;
};
