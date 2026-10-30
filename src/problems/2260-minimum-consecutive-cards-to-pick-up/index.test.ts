import { describe, expect, it } from "bun:test";
import { minimumConsecutiveCardsToPickUp as minimumCardPickup } from ".";

describe("2260. Minimum Consecutive Cards to Pick Up", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimumCardPickup([3, 4, 2, 3, 4, 7])).toBe(4);
		expect(minimumCardPickup([1, 0, 5, 3])).toBe(-1);
	});
});
