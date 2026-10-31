import { describe, expect, it } from "bun:test";
import { filterElementsFromArray } from ".";

describe("2634. Filter Elements from Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(filterElementsFromArray([0, 10, 20, 30], (n) => n > 10)).toEqual([
			20, 30,
		]);
		expect(filterElementsFromArray([1, 2, 3], (_, i) => i === 0)).toEqual([1]);
		expect(filterElementsFromArray([-2, -1, 0, 1, 2], (n) => n + 1)).toEqual([
			-2, 0, 1, 2,
		]);
	});
});
