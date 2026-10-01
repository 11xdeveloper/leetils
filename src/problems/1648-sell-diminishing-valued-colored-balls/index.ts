/**
 * 1648. Sell Diminishing-Valued Colored Balls
 *
 * A ball of a colour sells for how many balls of that colour remain.
 * Returns the most money from selling `orders` balls, modulo 10^9 + 7.
 *
 * Always sell from the colour with the most balls. Equivalently, find the
 * level `t` where selling every ball above `t` takes no more than
 * `orders`, but above `t − 1` takes more (binary search). Sell all balls
 * above `t`, then the remaining orders at price `t`.
 *
 * @see https://leetcode.com/problems/sell-diminishing-valued-colored-balls/
 * @difficulty Medium
 * @timeComplexity O(n log M) for the largest count M
 * @spaceComplexity O(1)
 *
 * @example
 * sellDiminishingValuedColoredBalls([2, 5], 4); // 14
 */
export const sellDiminishingValuedColoredBalls = (
	inventory: readonly number[],
	orders: number,
): number => {
	const above = (level: number) =>
		inventory.reduce((sum, count) => sum + Math.max(0, count - level), 0);
	let [low, high] = [0, Math.max(...inventory)];
	while (low < high) {
		const mid = Math.floor((low + high) / 2);
		if (above(mid) <= orders) high = mid;
		else low = mid + 1;
	}
	const level = BigInt(low);
	let profit = 0n;
	for (const count of inventory) {
		const top = BigInt(count);
		if (top > level) profit += ((top + level + 1n) * (top - level)) / 2n;
	}
	profit += BigInt(orders - above(low)) * level;
	return Number(profit % 1_000_000_007n);
};
