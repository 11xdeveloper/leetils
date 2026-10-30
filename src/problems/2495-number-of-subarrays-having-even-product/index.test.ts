import { describe, expect, it } from "bun:test";
import { numberOfSubarraysHavingEvenProduct as evenProduct } from ".";

describe("2495. Number of Subarrays Having Even Product", () => {
	it("solves the examples from the problem statement", () => {
		expect(evenProduct([9, 6, 7, 13])).toBe(6);
		expect(evenProduct([7, 3, 5])).toBe(0);
	});
});
