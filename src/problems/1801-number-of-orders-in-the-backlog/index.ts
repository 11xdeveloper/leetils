import { Heap } from "../../internal/heap";

/**
 * 1801. Number of Orders in the Backlog
 *
 * Processes batches `[price, amount, type]` of buy (0) or sell (1) orders:
 * each order matches the best opposing order in the backlog if the prices
 * allow, and otherwise waits there. Returns the backlog size at the end,
 * modulo 10^9 + 7.
 *
 * A max-heap of buy batches and a min-heap of sell batches, matching whole
 * batches at a time.
 *
 * @see https://leetcode.com/problems/number-of-orders-in-the-backlog/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * numberOfOrdersInTheBacklog([[10, 5, 0], [15, 2, 1], [25, 1, 1], [30, 4, 0]]); // 6
 */
export const numberOfOrdersInTheBacklog = (
	orders: readonly (readonly number[])[],
): number => {
	const buys = new Heap<[price: number, amount: number]>((a, b) => b[0] - a[0]);
	const sells = new Heap<[price: number, amount: number]>(
		(a, b) => a[0] - b[0],
	);
	for (const [price = 0, amount = 0, type = 0] of orders) {
		const [own, other] = type === 0 ? [buys, sells] : [sells, buys];
		const matches = (best: number) =>
			type === 0 ? best <= price : best >= price;
		let left = amount;
		while (left > 0) {
			const top = other.peek();
			if (!top || !matches(top[0])) break;
			other.pop();
			const traded = Math.min(left, top[1]);
			left -= traded;
			if (top[1] > traded) other.push([top[0], top[1] - traded]);
		}
		if (left > 0) own.push([price, left]);
	}
	let total = 0;
	for (const heap of [buys, sells])
		for (let entry = heap.pop(); entry; entry = heap.pop()) total += entry[1];
	return total % 1_000_000_007;
};
