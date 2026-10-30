import { describe, expect, it } from "bun:test";
import { takeGiftsFromTheRichestPile as pickGifts } from ".";

describe("2558. Take Gifts From the Richest Pile", () => {
	it("solves the examples from the problem statement", () => {
		expect(pickGifts([25, 64, 9, 4, 100], 4)).toBe(29);
		expect(pickGifts([1, 1, 1, 1], 4)).toBe(4);
	});
});
