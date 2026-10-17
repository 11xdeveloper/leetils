import { describe, expect, it } from "bun:test";
import { StockPriceFluctuation as StockPrice } from ".";

describe("2034. Stock Price Fluctuation", () => {
	it("solves the example from the problem statement", () => {
		const stock = new StockPrice();
		stock.update(1, 10);
		stock.update(2, 5);
		expect(stock.current()).toBe(5);
		expect(stock.maximum()).toBe(10);
		stock.update(1, 3);
		expect(stock.maximum()).toBe(5);
		stock.update(4, 2);
		expect(stock.minimum()).toBe(2);
	});

	it("handles out-of-order and repeated corrections", () => {
		const stock = new StockPrice();
		stock.update(5, 7);
		stock.update(3, 9);
		expect(stock.current()).toBe(7);
		stock.update(3, 7);
		stock.update(3, 1);
		expect(stock.maximum()).toBe(7);
		expect(stock.minimum()).toBe(1);
		stock.update(3, 7);
		expect(stock.minimum()).toBe(7);
	});
});
