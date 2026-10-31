import { describe, expect, it } from "bun:test";
import { firstUniqueEvenElement as firstUniqueEven } from ".";

describe("3866. First Unique Even Element", () => {
	it("solves the examples from the problem statement", () => {
		expect(firstUniqueEven([3, 4, 2, 5, 4, 6])).toBe(2);
		expect(firstUniqueEven([4, 4])).toBe(-1);
	});
});
