import { describe, expect, it } from "bun:test";
import { sumOfBeautyInTheArray as sumOfBeauty } from ".";

describe("2012. Sum of Beauty in the Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(sumOfBeauty([1, 2, 3])).toBe(2);
		expect(sumOfBeauty([2, 4, 6, 4])).toBe(1);
		expect(sumOfBeauty([3, 2, 1])).toBe(0);
	});

	it("scores 1 when only the neighbours are in order", () => {
		expect(sumOfBeauty([1, 5, 2, 3, 4])).toBe(1);
		expect(sumOfBeauty([1, 2, 3, 4, 5])).toBe(6);
	});
});
