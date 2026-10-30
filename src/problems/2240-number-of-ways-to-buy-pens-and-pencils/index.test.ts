import { describe, expect, it } from "bun:test";
import { numberOfWaysToBuyPensAndPencils as waysToBuy } from ".";

describe("2240. Number of Ways to Buy Pens and Pencils", () => {
	it("solves the examples from the problem statement", () => {
		expect(waysToBuy(20, 10, 5)).toBe(9);
		expect(waysToBuy(5, 10, 10)).toBe(1);
	});
});
