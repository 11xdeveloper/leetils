import { describe, expect, it } from "bun:test";
import { trionicArrayI as isTrionic } from ".";

describe("3637. Trionic Array I", () => {
	it("solves the examples from the problem statement", () => {
		expect(isTrionic([1, 3, 5, 4, 2, 6])).toBeTrue();
		expect(isTrionic([2, 1, 3])).toBeFalse();
	});

	it("rejects plateaus and extra runs", () => {
		expect(isTrionic([1, 2, 2, 1, 3])).toBeFalse();
		expect(isTrionic([1, 3, 2, 4, 1])).toBeFalse();
	});
});
