import { describe, expect, it } from "bun:test";
import { bestPokerHand as bestHand } from ".";

describe("2347. Best Poker Hand", () => {
	it("solves the examples from the problem statement", () => {
		expect(bestHand([13, 2, 3, 1, 9], ["a", "a", "a", "a", "a"])).toBe("Flush");
		expect(bestHand([4, 4, 2, 4, 4], ["d", "a", "a", "b", "c"])).toBe(
			"Three of a Kind",
		);
		expect(bestHand([10, 10, 2, 12, 9], ["a", "b", "c", "a", "d"])).toBe(
			"Pair",
		);
	});

	it("falls back to a high card", () => {
		expect(bestHand([1, 2, 3, 4, 5], ["a", "b", "c", "d", "a"])).toBe(
			"High Card",
		);
	});
});
