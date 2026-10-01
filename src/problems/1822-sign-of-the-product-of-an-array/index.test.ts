import { describe, expect, it } from "bun:test";
import { signOfTheProductOfAnArray as arraySign } from ".";

describe("1822. Sign of the Product of an Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(arraySign([-1, -2, -3, -4, 3, 2, 1])).toBe(1);
		expect(arraySign([1, 5, 0, 2, -3])).toBe(0);
		expect(arraySign([-1, 1, -1, 1, -1])).toBe(-1);
	});
});
