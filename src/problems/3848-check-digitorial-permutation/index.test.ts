import { describe, expect, it } from "bun:test";
import { checkDigitorialPermutation as isDigitorialPermutation } from ".";

describe("3848. Check Digitorial Permutation", () => {
	it("solves the examples from the problem statement", () => {
		expect(isDigitorialPermutation(145)).toBeTrue();
		expect(isDigitorialPermutation(10)).toBeFalse();
	});

	it("finds rearranged digitorial numbers", () => {
		expect(isDigitorialPermutation(541)).toBeTrue();
		expect(isDigitorialPermutation(58540)).toBeTrue();
		expect(isDigitorialPermutation(2)).toBeTrue();
	});
});
