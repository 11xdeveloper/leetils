/**
 * 3562. Maximum Profit from Trading Stocks with Discounts
 *
 * Employee 1 is the root of a hierarchy; employee i can buy a stock for
 * `present[i]` and sell it for `future[i]`, at half price (rounded down)
 * if their direct boss bought. Returns the most profit within `budget`.
 *
 * Tree knapsack: for each employee and whether their boss bought, the best
 * profit for every amount spent in their subtree. Merge children's tables
 * one at a time, with each child's choice of table depending on whether
 * this employee bought.
 *
 * @see https://leetcode.com/problems/maximum-profit-from-trading-stocks-with-discounts/
 * @difficulty Hard
 * @timeComplexity O(n · budget²)
 * @spaceComplexity O(n · budget)
 *
 * @example
 * maximumProfitFromTradingStocksWithDiscounts(2, [1, 2], [4, 3], [[1, 2]], 3); // 5
 */
export const maximumProfitFromTradingStocksWithDiscounts = (
	n: number,
	present: readonly number[],
	future: readonly number[],
	hierarchy: readonly (readonly number[])[],
	budget: number,
): number => {
	const NONE = Number.NEGATIVE_INFINITY;
	const children: number[][] = Array.from({ length: n + 1 }, () => []);
	for (const [boss = 0, employee = 0] of hierarchy)
		children[boss]?.push(employee);
	const merge = (a: Float64Array, b: Float64Array): Float64Array => {
		const result = new Float64Array(budget + 1).fill(NONE);
		for (let x = 0; x <= budget; x++) {
			if ((a[x] ?? NONE) === NONE) continue;
			for (let y = 0; x + y <= budget; y++) {
				if ((b[y] ?? NONE) === NONE) continue;
				result[x + y] = Math.max(
					result[x + y] ?? NONE,
					(a[x] ?? 0) + (b[y] ?? 0),
				);
			}
		}
		return result;
	};
	const empty = (): Float64Array => {
		const table = new Float64Array(budget + 1).fill(NONE);
		table[0] = 0;
		return table;
	};
	// best[v][discounted]: profit by spend in v's subtree.
	const best: Float64Array[][] = Array.from({ length: n + 1 }, () => []);
	const order = [1];
	for (let i = 0; i < order.length; i++)
		order.push(...(children[order[i] ?? 1] ?? []));
	for (let i = order.length - 1; i >= 0; i--) {
		const v = order[i] ?? 1;
		let ifSkip = empty();
		let ifBuy = empty();
		for (const child of children[v] ?? []) {
			ifSkip = merge(ifSkip, best[child]?.[0] ?? empty());
			ifBuy = merge(ifBuy, best[child]?.[1] ?? empty());
		}
		best[v] = [0, 1].map((discounted) => {
			const price = discounted
				? Math.floor((present[v - 1] ?? 0) / 2)
				: (present[v - 1] ?? 0);
			const gain = (future[v - 1] ?? 0) - price;
			const table = Float64Array.from(ifSkip);
			for (let spent = 0; spent + price <= budget; spent++) {
				const rest = ifBuy[spent] ?? NONE;
				if (rest !== NONE)
					table[spent + price] = Math.max(
						table[spent + price] ?? NONE,
						rest + gain,
					);
			}
			return table;
		});
	}
	return Math.max(0, ...(best[1]?.[0] ?? [0]));
};
