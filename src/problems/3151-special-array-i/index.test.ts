import { describe, expect, it } from "bun:test";
import { specialArrayI as isArraySpecial } from ".";

describe("3151. Special Array I", () => {
	it("solves the examples from the problem statement", () => {
		expect(isArraySpecial([1])).toBeTrue();
		expect(isArraySpecial([2, 1, 4])).toBeTrue();
		expect(isArraySpecial([4, 3, 1, 6])).toBeFalse();
	});
});
