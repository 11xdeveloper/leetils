/**
 * 3679. Minimum Discards to Balance Inventory
 *
 * Item `arrivals[i]` arrives on day i and is kept or discarded at once.
 * Every window of `w` consecutive days may keep at most `m` items of each
 * type. Returns the fewest discards.
 *
 * Keep each item whenever the window ending today allows it: keeping
 * earlier is never worse, since an item kept earlier leaves the window
 * sooner.
 *
 * @see https://leetcode.com/problems/minimum-discards-to-balance-inventory/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumDiscardsToBalanceInventory([1, 2, 3, 3, 3, 4], 3, 2); // 1
 */
export const minimumDiscardsToBalanceInventory = (
	arrivals: readonly number[],
	w: number,
	m: number,
): number => {
	const kept = new Uint8Array(arrivals.length);
	const counts = new Map<number, number>();
	let discards = 0;
	arrivals.forEach((type, i) => {
		if (i >= w && kept[i - w]) {
			const old = arrivals[i - w] ?? 0;
			counts.set(old, (counts.get(old) ?? 0) - 1);
		}
		if ((counts.get(type) ?? 0) < m) {
			kept[i] = 1;
			counts.set(type, (counts.get(type) ?? 0) + 1);
		} else discards++;
	});
	return discards;
};
