import { describe, expect, it } from "bun:test";
import { ApplyDiscountEveryNOrders as Cashier } from ".";

describe("1357. Apply Discount Every n Orders", () => {
	it("solves the example from the problem statement", () => {
		const cashier = new Cashier(
			3,
			50,
			[1, 2, 3, 4, 5, 6, 7],
			[100, 200, 300, 400, 300, 200, 100],
		);
		expect(cashier.getBill([1, 2], [1, 2])).toBeCloseTo(500);
		expect(cashier.getBill([3, 7], [10, 10])).toBeCloseTo(4000);
		expect(
			cashier.getBill([1, 2, 3, 4, 5, 6, 7], [1, 1, 1, 1, 1, 1, 1]),
		).toBeCloseTo(800);
		expect(cashier.getBill([4], [10])).toBeCloseTo(4000);
		expect(cashier.getBill([7, 3], [10, 10])).toBeCloseTo(4000);
		expect(
			cashier.getBill([7, 5, 3, 1, 6, 4, 2], [10, 10, 10, 9, 9, 9, 7]),
		).toBeCloseTo(7350);
		expect(cashier.getBill([2, 3, 5], [5, 3, 2])).toBeCloseTo(2500);
	});

	it("discounts every customer when n is 1", () => {
		const cashier = new Cashier(1, 10, [1], [50]);
		expect(cashier.getBill([1], [3])).toBeCloseTo(135);
		expect(cashier.getBill([1], [1])).toBeCloseTo(45);
	});
});
