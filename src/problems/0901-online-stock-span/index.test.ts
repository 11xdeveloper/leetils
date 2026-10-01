import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { OnlineStockSpan as StockSpanner } from ".";

describe("901. Online Stock Span", () => {
	it("solves the example from the problem statement", () => {
		const spanner = new StockSpanner();
		expect(
			[100, 80, 60, 70, 60, 75, 85].map((price) => spanner.next(price)),
		).toEqual([1, 1, 1, 2, 1, 4, 6]);
	});

	it("matches counting back from each day on random prices", () => {
		const random = createRandom(901);
		for (let run = 0; run < 300; run++) {
			const spanner = new StockSpanner();
			const prices = random.array(random.int(1, 20), 1, 10);
			for (const [day, price] of prices.entries()) {
				let span = 0;
				while (day - span >= 0 && (prices[day - span] ?? 0) <= price) span++;
				expect(spanner.next(price)).toBe(span);
			}
		}
	});
});
