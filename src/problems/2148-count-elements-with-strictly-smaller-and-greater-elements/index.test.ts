import { describe, expect, it } from "bun:test";
import { countElementsWithStrictlySmallerAndGreaterElements as countElements } from ".";

describe("2148. Count Elements With Strictly Smaller and Greater Elements", () => {
	it("solves the examples from the problem statement", () => {
		expect(countElements([11, 7, 2, 15])).toBe(2);
		expect(countElements([-3, 3, 3, 90])).toBe(2);
	});
});
