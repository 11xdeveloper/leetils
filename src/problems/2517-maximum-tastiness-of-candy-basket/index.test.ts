import { describe, expect, it } from "bun:test";
import { maximumTastinessOfCandyBasket as maximumTastiness } from ".";

describe("2517. Maximum Tastiness of Candy Basket", () => {
	it("solves the examples from the problem statement", () => {
		expect(maximumTastiness([13, 5, 1, 8, 21, 2], 3)).toBe(8);
		expect(maximumTastiness([1, 3, 1], 2)).toBe(2);
		expect(maximumTastiness([7, 7, 7, 7], 2)).toBe(0);
	});
});
