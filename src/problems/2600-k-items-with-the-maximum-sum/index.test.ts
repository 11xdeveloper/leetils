import { describe, expect, it } from "bun:test";
import { kItemsWithTheMaximumSum as kItemsWithMaximumSum } from ".";

describe("2600. K Items With the Maximum Sum", () => {
	it("solves the examples from the problem statement", () => {
		expect(kItemsWithMaximumSum(3, 2, 0, 2)).toBe(2);
		expect(kItemsWithMaximumSum(3, 2, 0, 4)).toBe(3);
	});

	it("takes -1s once the others run out", () => {
		expect(kItemsWithMaximumSum(1, 1, 3, 4)).toBe(-1);
	});
});
