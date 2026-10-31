import { describe, expect, it } from "bun:test";
import { miceAndCheese } from ".";

describe("2611. Mice and Cheese", () => {
	it("solves the examples from the problem statement", () => {
		expect(miceAndCheese([1, 1, 3, 4], [4, 4, 1, 1], 2)).toBe(15);
		expect(miceAndCheese([1, 1], [1, 1], 2)).toBe(2);
	});
});
