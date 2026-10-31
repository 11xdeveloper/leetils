/**
 * 3668. Restore Finishing Order
 *
 * `order` lists everyone by finishing position; returns the ids in
 * `friends` in that order.
 *
 * @see https://leetcode.com/problems/restore-finishing-order/
 * @difficulty Easy
 * @timeComplexity O(n + m)
 * @spaceComplexity O(m)
 *
 * @example
 * restoreFinishingOrder([3, 1, 2, 5, 4], [1, 3, 4]); // [3, 1, 4]
 */
export const restoreFinishingOrder = (
	order: readonly number[],
	friends: readonly number[],
): number[] => {
	const wanted = new Set(friends);
	return order.filter((id) => wanted.has(id));
};
