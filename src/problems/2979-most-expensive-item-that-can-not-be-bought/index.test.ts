import { describe, expect, it } from "bun:test";
import { mostExpensiveItemThatCanNotBeBought as mostExpensiveItem } from ".";

describe("2979. Most Expensive Item That Can Not Be Bought", () => {
	it("solves the examples from the problem statement", () => {
		expect(mostExpensiveItem(2, 5)).toBe(3);
		expect(mostExpensiveItem(5, 7)).toBe(23);
	});

	it("matches checking amounts directly", () => {
		for (const [p, q] of [
			[3, 7],
			[11, 13],
		] as const) {
			const payable = (x: number): boolean => {
				for (let a = 0; a * p <= x; a++) if ((x - a * p) % q === 0) return true;
				return false;
			};
			let largest = 0;
			for (let x = 1; x <= p * q; x++) if (!payable(x)) largest = x;
			expect(mostExpensiveItem(p, q)).toBe(largest);
		}
	});
});
