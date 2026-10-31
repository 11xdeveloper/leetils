import { describe, expect, it } from "bun:test";
import { sumOfNumberAndItsReverse } from ".";

describe("2443. Sum of Number and Its Reverse", () => {
	it("solves the examples from the problem statement", () => {
		expect(sumOfNumberAndItsReverse(443)).toBeTrue();
		expect(sumOfNumberAndItsReverse(63)).toBeFalse();
		expect(sumOfNumberAndItsReverse(181)).toBeTrue();
	});

	it("accepts zero", () => {
		expect(sumOfNumberAndItsReverse(0)).toBeTrue();
	});
});
