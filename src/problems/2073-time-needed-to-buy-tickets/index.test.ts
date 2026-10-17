import { describe, expect, it } from "bun:test";
import { timeNeededToBuyTickets as timeToBuy } from ".";

describe("2073. Time Needed to Buy Tickets", () => {
	it("solves the examples from the problem statement", () => {
		expect(timeToBuy([2, 3, 2], 2)).toBe(6);
		expect(timeToBuy([5, 1, 1, 1], 0)).toBe(8);
	});

	it("doesn't count people after k on the final round", () => {
		expect(timeToBuy([1, 5, 5], 0)).toBe(1);
		expect(timeToBuy([3, 3, 3], 1)).toBe(8);
	});
});
