import { describe, expect, it } from "bun:test";
import { removingMinimumNumberOfMagicBeans as minimumRemoval } from ".";

describe("2171. Removing Minimum Number of Magic Beans", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimumRemoval([4, 1, 6, 5])).toBe(4);
		expect(minimumRemoval([2, 10, 3, 2])).toBe(7);
	});
});
