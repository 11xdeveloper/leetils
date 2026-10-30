import { describe, expect, it } from "bun:test";
import { rearrangeArrayElementsBySign as rearrangeArray } from ".";

describe("2149. Rearrange Array Elements by Sign", () => {
	it("solves the examples from the problem statement", () => {
		expect(rearrangeArray([3, 1, -2, -5, 2, -4])).toEqual([
			3, -2, 1, -5, 2, -4,
		]);
		expect(rearrangeArray([-1, 1])).toEqual([1, -1]);
	});
});
